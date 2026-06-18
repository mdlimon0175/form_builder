"use client"
import { useRef, useState } from "react"
import { DndProvider } from 'react-dnd'
import { useForm } from "react-hook-form";
import { useDrag, useDrop } from 'react-dnd';
import { useQuery } from "@tanstack/react-query";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import LeftSidebar from "../Sidebar/LeftSidebar";
import { fetchFormBuilderData } from "@/lib/dataFetching";
import FieldOption from "./FieldOption";
import FieldRightSidebar from "../Sidebar/FieldRightSidebar";
import TextField from "./Fields/TextField";
import DateField from "./Fields/DateField";
import SelectField from "./Fields/SelectField";
import CheckboxField from "./Fields/CheckboxField";
import FileField from "./Fields/FileField";
import AcceptanceField from "./Fields/AcceptanceField";

function queryParamBool(query_param) {
    if(!query_param) return false;

    if(query_param === "true") return true;
    return false;
}

export default function FormBuilder() {
    const previewMode = queryParamBool(
        useSearchParams()
        .get('preview_mode')
    );

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="grid grid-cols-12 gap-6">
                {!previewMode && <LeftSidebar className={"col-span-3"} />}
                <div className={`${previewMode ? "col-span-12" : "col-span-9"}`}>
                    <FormContainer />
                </div>
            </div>
        </DndProvider>
    )
}

function FormContainer() {
    const previewMode = queryParamBool(
        useSearchParams()
        .get('preview_mode')
    );
    const { push } = useRouter();
    const pathname = usePathname();
    const { data } = useQuery({
        queryKey: ['data'],
        queryFn: fetchFormBuilderData
    });
    const {register, setValue, handleSubmit, getValues, unregister} = useForm();
    const [selectedField, setSelectedField] = useState(null);
    const [fieldsData, setFieldsData] = useState(data?.data?.fields ?? []);
    const [swapIndex, setSwapIndex] = useState(-1);
    const generateId = () => {
        const existingIdSet = new Set(fieldsData.map(obj => obj.id));
        let newId;
        do {
            newId = Math.random().toString(36).substring(2, 10);
        } while(existingIdSet.has(newId));

        return newId;
    }

    const handleFieldDuplicate = (field_id) => {
        const fieldIndex = fieldsData.findIndex(f => f.id === field_id);
        if(fieldIndex === -1) return;
        const field = fieldsData[fieldIndex];
        const { id, ...restProperties } = field;

        const newField = {
            id: generateId(),
            ...restProperties
        }

        const newFieldsData = fieldsData
            .slice(0, fieldIndex + 1)
            .concat([newField])
            .concat(fieldsData.slice(fieldIndex + 1));

        setFieldsData(newFieldsData);
    }

    const handleReorderingField = (fromIndex, toIndex) => {
        const copiedFieldsData = [...fieldsData];
        let temp;

        if(fromIndex < toIndex) {
            for(let i = fromIndex; i < toIndex; i++) {
                temp = copiedFieldsData[i];
                copiedFieldsData[i] = copiedFieldsData[i + 1];
                copiedFieldsData[i + 1] = temp;
            }
        } else {
            for(let i = fromIndex; i > toIndex; i--) {
                temp = copiedFieldsData[i];
                copiedFieldsData[i] = copiedFieldsData[i - 1];
                copiedFieldsData[i - 1] = temp;
            }
        }
        
        setFieldsData(copiedFieldsData);
    }

    const handleAddField = (newField, toIndex) => {
        const id = generateId();
        const finalField = {
            id,
            name: id,
            ...newField
        }

        const newFieldsData = fieldsData
            .slice(0, toIndex)
            .concat([finalField])
            .concat(fieldsData.slice(toIndex));

        setFieldsData(newFieldsData);
        setSelectedField(finalField);
    }

    const handleFieldSetting = (field_id) => {
        const fieldIndex = fieldsData.findIndex(f => f.id === field_id);
        if(fieldIndex === -1) return;
        setSelectedField(fieldsData[fieldIndex]);
    }

    const handleCloseRightSidebar = (field_id) => {
        if(selectedField && selectedField.id === field_id) {
            setSelectedField(null);
        }
    }

    const handleFieldUpdate = (field_id, updated_data) => {
        const updatedFieldsData = fieldsData.map(f => {
            if(f.id === field_id) {
                if(updated_data.name !== f.name) {
                    const formValues = getValues();
                    if(f.name in formValues) {
                        const oldValues = formValues[f.name];
                        unregister(f.name);
                        register(updated_data.name);
                        setValue(updated_data.name, oldValues);
                    }
                }
                let updatedData = {
                    id: f.id,
                    type: f.type,
                    label: updated_data.label,
                    name: updated_data.name,
                    placeholder: updated_data.placeholder,
                    required: updated_data.required,
                    columnWidth: updated_data.columnWidth,
                }

                if(["select", "checkbox", "radio"].includes(f.type)) {
                    updatedData.options = updated_data.options.split("\n")
                }
                if(f.type === "acceptance") {
                    updatedData.content = updated_data.content
                }

                return updatedData;
            }
            return f;
        });
        setSelectedField(null);
        setFieldsData(updatedFieldsData);
    }

    const handleFieldDelete = (field_id) => {
        const newFieldsData = fieldsData.filter(f => f.id !== field_id);
        setFieldsData(newFieldsData);
    }

    const onSubmitHandler = (data) => {
        console.log(data);
    }

    const renderField = (field) => {
        switch(field.type) {
            case "text":
            case "email":
                return (
                    <TextField
                        field={field}
                        register={register}
                    />
                )
            case "date":
            case "time":
                return (
                    <DateField
                        field={field}
                        setValue={setValue}
                    />
                )
            case "select":
                return (
                    <SelectField 
                        field={field}
                        setValue={setValue}
                    />
                )
            case "radio":
            case "checkbox":
                return (
                    <CheckboxField
                        field={field}
                        register={register}
                    />
                )
            case "file":
                return (
                    <FileField
                        field={field}
                        setValue={setValue}
                    />
                )
            case "acceptance":
                return (
                    <AcceptanceField
                        field={field}
                        register={register}
                    />
                )
            default:
                console.warn(`Invalid field type - ${field?.type || "Not defined"}`);
                return null;
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)} className="py-6 relative">
            <h1 className="text-2xl text-center mb-10">{data?.data?.name ?? "Custom Form"}</h1>
            <div className="absolute top-6 left-0 z-50">
                <button
                    type="button"
                    onClick={() => push(`${pathname}?preview_mode=${!previewMode}`)}
                    className="text-gray-700 focus:outline-none focus:border-none font-semibold text-sm cursor-pointer"
                >
                    Go {previewMode ? "Builder Mode" : "Preview Mode"}
                </button>
            </div>
            <div className="space-y-4">
                {data.status ? (
                    <>
                        <div className={`${previewMode ? "flex flex-wrap" : "preview_mode_wrapper"}`}>
                            {fieldsData.map((field, i) => {
                                const { columnWidth } = field;
                                const propertyName = previewMode ? "flexBasis" : "width";
                                const propertyValue = previewMode ? columnWidth : "50%";
                                const style = {[propertyName]: propertyValue};
                                return (
                                    <DragableField 
                                        key={field.id}
                                        style={style}
                                        index={i}
                                        swapIndex={swapIndex}
                                        setSwapIndex={setSwapIndex}
                                        handleMove={handleReorderingField}
                                        handleAddField={handleAddField}
                                    >
                                        {renderField(field)}
                                        {!previewMode ? (
                                            <>
                                                <FieldOption
                                                    field_id={field.id}
                                                    handleFieldDelete={handleFieldDelete}
                                                    handleFieldSetting={handleFieldSetting}
                                                    handleFieldDuplicate={handleFieldDuplicate}
                                                />
                                                {
                                                    selectedField && 
                                                    selectedField.id === field.id && 
                                                    <FieldRightSidebar 
                                                        data={field}
                                                        handleFieldUpdateSubmit={handleFieldUpdate}
                                                        handleClose={handleCloseRightSidebar}
                                                    />
                                                }
                                            </>
                                        ): null}
                                    </DragableField>
                                )
                            })}
                        </div>
                        <button type="submit" className="form_btn">Submit</button>
                    </>
                ) : (
                    <p className="font-bold text-red-400">{data.message}</p>
                )}
            </div>
        </form>
    )
}

function DragableField({ children, style, index, swapIndex, setSwapIndex, handleMove, handleAddField }) {
    const [swapPosition, setSwapPosition] = useState(undefined);
    const previewMode = queryParamBool(
        useSearchParams()
        .get('preview_mode')
    );
    const [{ isOver }, drop] = useDrop({
        accept: 'FIELD',
        canDrop: () => {
            return !previewMode
        },
        drop: (item) => {
            if(typeof item.index === "number") {
                // reorder
                if (item.index !== index) {
                    handleMove(item.index, index);
                    item.index = index;
                }
            } else {
                // add new one
                handleAddField(item, index);
            }
            setSwapIndex(-1);
            setSwapPosition(undefined);
        },
        hover: (item) => {
            if(swapIndex !== index) setSwapIndex(index);
            if(typeof item.index === "number" && item.index !== index) {
                if(item.index > index) {
                    setSwapPosition("top");
                } else {
                    setSwapPosition("bottom");
                }
            } else if(item.index === index) {
                setSwapPosition("bottom");
            } else {
                setSwapPosition("top");
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        })
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'FIELD',
        item: { index, canDrag: !previewMode },
        canDrag: (item) => {
            return item.canDrag
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    return (
        <div 
            style={style}
            ref={node => drag(drop(node))}
            className={`group form_input_cont pb-4 last:pb-0 ${isDragging ? "opacity-50" : "opacity-100"} ${swapIndex === index && isOver ? swapPosition === "top" ? "border-t" : "border-b" : "border-none"}`}
        >
            {children}
        </div>
    )
}