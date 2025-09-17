"use client"
import { prepareOptions } from "@/helper/helper";
import RequireMarks from "@/components/utils/RequireMarks";

export default function CheckboxField({ field, register }) {
    return (
        <>
            <span className="form_label">{field.label}{field?.required && <RequireMarks />}</span>
            <div className="space-y-1">
                {prepareOptions(field.options).map((opt) => (
                    <span key={opt.value} className="block">
                        <label className="inline-flex items-center space-x-2 cursor-pointer">
                            <input
                                type={field.type}
                                value={opt.value}
                                {...register(field.name)}
                                required={field?.required ?? false}
                            />
                            <span className="text-sm">{opt.label}</span>
                        </label>
                    </span>
                ))}
            </div>
        </>
    );
}
