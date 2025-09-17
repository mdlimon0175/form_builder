"use client";
import { useEffect, useRef, useState } from "react";

export default function FieldRightSidebar({ data, handleFieldUpdateSubmit, handleClose }) {
    const containerRef = useRef(null);
    const [formValues, setFormValues] = useState({
        label: data?.label ?? "",
        name: data?.name ?? "",
        placeholder: data?.placeholder ?? "",
        required: data?.required ?? false,
        options: data?.options?.join("\n") ?? "",
        columnWidth: data?.columnWidth ?? "50",
        content: data?.content ?? ""
    });

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target)
            ) {
                handleClose(data.id);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        setFormValues({...formValues, [name]: value});
    }

    const renderField = (field_name) => {
        switch (field_name) {
            case "label":
            case "name":
            case "placeholder":
                return (
                    <InputField
                        key={field_name}
                        label={field_name.charAt(0).toUpperCase() + field_name.slice(1)}
                        name={field_name}
                        value={formValues[field_name]}
                        onChange={onChangeHandler}
                    />
                );
            case "columnWidth":
                return (
                    <InputField
                        key={field_name}
                        type="number"
                        label={"Column Width (%)"}
                        name={field_name}
                        value={parseFloat(formValues[field_name].replace('%', ''))}
                        onChange={onChangeHandler}
                    />
                );
            case "required":
                return (
                    <ToggleButton
                        key={field_name}
                        label={field_name.charAt(0).toUpperCase() + field_name.slice(1)}
                        name={field_name}
                        value={formValues[field_name]}
                        onChange={onChangeHandler}
                    />
                );
            default:
                return;
        }
    }

    return (
        <div
            ref={containerRef}
            className="absolute w-md top-0 right-0 translate-x-full z-50"
        >
            <div className="absolute bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-semibold mb-4">Setting</h2>
                <div className="space-y-4">
                    {data.type !== "acceptance" && Object.keys(formValues).map(renderField)}
                    {["select", "radio", "checkbox"].includes(data.type) && <InputField
                        key={data.type}
                        type="textarea"
                        label={"Options (key=value as per new line)"}
                        name={"options"}
                        value={formValues["options"]}
                        onChange={onChangeHandler}
                    />}
                    {data.type === "acceptance" ? (
                        <>
                            {["required", "columnWidth"].map(renderField)}
                            <InputField
                                key={data.type}
                                type="textarea"
                                label={"Context (html)"}
                                name={"acceptance"}
                                value={formValues["content"]}
                                onChange={onChangeHandler}
                            />
                        </>
                    ) : null}
                    <button
                        type="button"
                        onClick={() => handleFieldUpdateSubmit(data.id, formValues)}
                        className="mt-4 cursor-pointer bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </div>
                <div className="absolute top-8 right-8">
                    <button
                        type="button"
                        onClick={() => handleClose(data.id)}
                        className="text-gray-700 font-semibold cursor-pointer text-sm"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

function InputField(props) {
    const { label, type, ...rest } = props;
    return (
        <div>
            <label>{label}</label>
            {type !== "textarea" ? (
                <input type={type ?? "text"} className="form_input" {...rest} />
            ) : (
                <textarea rows={8} className="form_input" {...rest} />
            )}
        </div>
    );
}

function ToggleButton(props) {
    const { label, value, name, onChange, ...rest } = props;
    const [isActive, setIsActive] = useState(value ?? false);

    const onChangeHandler = () => {
        onChange({
            target: {
                value: !isActive,
                name: name,
                type: "checkbox"
            },
        });
        setIsActive(!isActive);
    };

    return (
        <div className="flex items-center">
            <div className="mr-4">
                <span>{label}</span>
            </div>
            <div
                onClick={onChangeHandler}
                className={`cursor-pointer w-10 h-5 flex items-center rounded-full p-1 transition-colors ${
                    isActive ? "bg-blue-500" : "bg-red-500"
                }`}
            >
                <div
                    className={`size-4 bg-white rounded-full transition-transform transform ${
                        isActive ? "translate-x-[18px]" : "translate-x-0"
                    }`}
                ></div>
            </div>
        </div>
    );
}
