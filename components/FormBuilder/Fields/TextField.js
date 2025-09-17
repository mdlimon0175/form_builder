"use client"
import RequireMarks from "@/components/utils/RequireMarks"

export default function TextField({ field, register }) {
    return (
        <>
            <label className="form_label">
                {field.label}{field?.required && <RequireMarks />}
            </label>
            <input
                type={field.type}
                className="form_input"
                {...register(field.name)}
                required={field?.required ?? false}
                placeholder={field?.placeholder ?? null}
            />
        </>
    )
}