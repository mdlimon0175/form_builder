"use client"
import { useState } from "react";
import dynamic from "next/dynamic";
import { prepareOptions } from "@/helper/helper";
import RequireMarks from "@/components/utils/RequireMarks";
const Select = dynamic(
    () => import('react-select'),
    {
        ssr: false,
        loading: () => <span className="text-gray-700 text-sm">Loading...</span>
    }
);


export default function SelectField({ field, setValue }) {
    const [selectedOption, setSelectedOption] = useState(null);

    return (
        <>
            <label className="form_label">{field.label}{field?.required && <RequireMarks />}</label>
            <Select
                options={prepareOptions(field.options)}
                value={selectedOption}
                placeholder={field?.placeholder || null}
                onChange={(value) => {
                    setSelectedOption(value);
                    setValue(field.name, value.value);
                }}
                required={field?.required ?? false}
            />
        </>
    );
}
