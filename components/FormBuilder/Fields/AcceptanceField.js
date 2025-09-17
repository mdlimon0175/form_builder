"use client";
import parse from "html-react-parser";

export default function AcceptanceField({ field, register }) {
    return (
        <>
            <label className="inline-flex items-start text-sm space-x-2">
                <input
                    type="checkbox"
                    required={field?.required ?? false}
                    {...register("acceptance", {
                        required: "You must accept the terms",
                    })}
                    className="form-checkbox mt-1 text-blue-600"
                />
                <div>{parse(field.content)}</div>
            </label>
        </>
    );
}
