"use client"
import RequireMarks from "@/components/utils/RequireMarks";

export default function FileField({ field, setValue }) {
    return (
        <>
            <label className="form_label">
                {field.label}{field?.required && <RequireMarks />}
            </label>
            <input
                type={field.type}
                className="form_input cursor-pointer"
                maxLength={1}
                onChange={e => {
                    if(e.target.files.length) {
                        const file = e.target.files.item(0);
                        setValue(field.name, file);
                    }
                }}
                required={field?.required ?? false}
            />
        </>
    );
}