"use client";
import { useEffect, useRef, useState } from "react";

export default function FieldRightSidebar({ data, onSubmitFieldUpdate, onClose }) {
    const backdropRef = useRef(null);
    const containerRef = useRef(null);
    const [formValues, setFormValues] = useState({
        label: data?.label ?? "",
        name: data?.name ?? "",
        placeholder: data?.placeholder ?? "",
        required: data?.required ?? false,
        options: data?.options?.join("\n") ?? "",
        columnWidth: data?.columnWidth ?? "50%",
        content: data?.content ?? "",
    });

    useEffect(() => {
        blockUiFocus();
        function handleFadeInAnimationEnd(e) {
            if(e.animationName === "fadeIn") {
                containerRef.current.querySelector("input").focus();
            }
        }
        containerRef.current.addEventListener("animationend", handleFadeInAnimationEnd, {once: true});
        document.addEventListener("keyup", handleEscapeUp);

        return () => {
            unblockUiFocus();
            document.removeEventListener("keyup", handleEscapeUp);
        }
    }, []);

    function blockUiFocus() {
        Array.from(document.body.children).forEach(el => {
            if(!el.getAttribute("data-dialog") && el.tagName !== "SCRIPT") {
                el.setAttribute("inert", true);
            }
        })
    }

    function unblockUiFocus() {
        Array.from(document.body.children).forEach(el => {
            if(!el.getAttribute("data-dialog")) {
                el.removeAttribute("inert");
            }
        })
    }

    function handleEscapeUp(e) {
        if (e.key === "Escape") {
            handleClose();
        }
    }

    function onChangeHandler(e) {
        const { value, name } = e.target;
        setFormValues({
            ...formValues,
            [name]: name === "columnWidth" ? `${value}%` : value,
        });
    }

    function renderField(field_name) {
        switch (field_name) {
            case "label":
            case "name":
            case "placeholder":
                return (
                    <InputField
                        key={field_name}
                        label={
                            field_name.charAt(0).toUpperCase() +
                            field_name.slice(1)
                        }
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
                        value={
                            parseFloat(
                                formValues[field_name].replace("%", "")
                            ) || ""
                        }
                        onChange={onChangeHandler}
                    />
                );
            case "required":
                return (
                    <ToggleButton
                        key={field_name}
                        label={
                            field_name.charAt(0).toUpperCase() +
                            field_name.slice(1)
                        }
                        name={field_name}
                        value={formValues[field_name]}
                        onChange={onChangeHandler}
                    />
                );
            default:
                return;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        backdropRef.current.classList.add("form_hide_animation");
        containerRef.current.classList.add("form_hide_animation");
        containerRef.current.addEventListener("animationend", handleAnimationEndOnSubmit, {once: true});
    }

    function handleClose() {
        backdropRef.current.classList.add("form_hide_animation");
        containerRef.current.classList.add("form_hide_animation");
        containerRef.current.addEventListener("animationend", handleAnimationEnd, {once: true});
    }

    function handleAnimationEnd() {
        onClose(data.id);
    }

    function handleAnimationEndOnSubmit() {
        onSubmitFieldUpdate(data.id, formValues);
    }

    return (
        <div
            aria-modal="true"
            data-dialog="true"
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            <div ref={backdropRef} className="absolute inset-0 -z-[1] bg-black/50 form_show_animation" />
            <form
                ref={containerRef}
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
                className="relative form_show_animation m-4 bg-white rounded-lg shadow-lg w-full max-w-lg p-4 sm:p-6 md:p-8 max-h-[90vh] overflow-y-auto"
            >
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                    Setting
                </h2>

                <div className="space-y-4">
                    {data.type !== "acceptance" &&
                        Object.keys(formValues).map(renderField)}

                    {["select", "radio", "checkbox"].includes(data.type) && (
                        <InputField
                            key={data.type}
                            type="textarea"
                            label="Options (key=value as per new line)"
                            name="options"
                            value={formValues.options}
                            onChange={onChangeHandler}
                        />
                    )}

                    {data.type === "acceptance" && (
                        <>
                            {["required", "columnWidth"].map(renderField)}

                            <InputField
                                key={data.type}
                                type="textarea"
                                label="Context (html)"
                                name="acceptance"
                                value={formValues.content}
                                onChange={onChangeHandler}
                            />
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full sm:w-auto mt-4 cursor-pointer bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                    >
                        Save Changes
                    </button>
                </div>

                <button
                    type="button"
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-700 font-semibold text-sm cursor-pointer"
                >
                    Close
                </button>
            </form>
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
                type: "checkbox",
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
