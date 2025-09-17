"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";

import RequireMarks from "@/components/utils/RequireMarks";

export default function DateField({ field, setValue }) {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <>
            <label className="form_label">{field.label}{field?.required && <RequireMarks />}</label>
            {field.type === "date" ? (
                <DatePicker
                    onChange={(value) => {
                        setSelectedDate(value);
                        setValue(field.name, value);
                    }}
                    selected={selectedDate}
                    dateFormat="dd/MM/yyyy"
                    className="form_input"
                    wrapperClassName="w-full"
                    required={field?.required ?? false}
                    placeholderText={field?.placeholder || null}
                />
            ) : (
                <DatePicker
                    onChange={(value) => {
                        setSelectedDate(value);
                        setValue(field.name, value);
                    }}
                    showTimeSelect
                    showTimeSelectOnly
                    selected={selectedDate}
                    timeFormat="HH:mm"
                    timeIntervals={10}
                    dateFormat="HH:mm"
                    className="form_input"
                    wrapperClassName="w-full"
                    required={field?.required ?? false}
                    placeholderText={field?.placeholder || null}
                />
            )}
        </>
    );
}
