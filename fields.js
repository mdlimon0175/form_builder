import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export default function CustomForm({ fields = {}, rawOptions }) {
  const { register, handleSubmit, setValue, watch, control, formState: { errors } } = useForm();
  const [state, submitAction] = React.useActionState(async (prevState, formData) => {
    const entries = Object.fromEntries(formData);
    console.log("Form Submitted:", entries);
    return { success: true };
  }, {});

  // Controlled select and date
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  // Watch for acceptance
  const accepted = watch("acceptance");

  // Transform options for select, radio, and checkboxes
  const parseOptions = (rawOptions) => {
    return rawOptions.map((item) => {
      const [label, value] = item.split("=");
      return {
        label: label.trim(),
        value: value.trim(),
      };
    });
  };

  // Get field width for responsive design
  const getWidthClass = (fieldName) => {
    const percent = fields[fieldName] || "100%";
    const width = parseInt(percent);
    if (width >= 100) return "w-full";
    if (width >= 75) return "w-[75%]";
    if (width >= 66) return "w-[66%]";
    if (width >= 50) return "w-[50%]";
    if (width >= 33) return "w-[33%]";
    if (width >= 25) return "w-[25%]";
    return "w-full";
  };

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    submitAction({}, data);
  };

  const options = parseOptions(rawOptions);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-wrap gap-4 p-6 bg-white rounded-md shadow-md max-w-5xl mx-auto"
    >
      {/* Text Input */}
      <div className={`relative ${getWidthClass("text")}`}>
        <input
          type="text"
          {...register("text", { required: "This field is required" })}
          placeholder=" "
          id="text"
          className="peer block w-full border border-gray-300 rounded-md px-3 pt-6 pb-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <label
          htmlFor="text"
          className="absolute left-3 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-blue-500"
        >
          Text Field
        </label>
        {errors.text && <p className="text-red-500 text-xs">{errors.text.message}</p>}
      </div>

      {/* React Select */}
      <div className={`${getWidthClass("select")}`}>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Select Option
        </label>
        <Controller
          name="select"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={options}
              onChange={(val) => setSelectedOption(val)}
              className="react-select"
            />
          )}
        />
        {errors.select && <p className="text-red-500 text-xs">{errors.select.message}</p>}
      </div>

      {/* Date Picker */}
      <div className={`${getWidthClass("date")}`}>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Select Date
        </label>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              onChange={(val) => {
                setSelectedDate(val);
                setValue("date", val);
              }}
              value={selectedDate}
            />
          )}
        />
      </div>

      {/* Time Picker */}
      <div className={`${getWidthClass("time")}`}>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Select Time
        </label>
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              onChange={(val) => {
                setSelectedTime(val);
                setValue("time", val);
              }}
              value={selectedTime}
              disableCalendar={true}
              format="HH:mm"
              clockIcon={null}
            />
          )}
        />
      </div>

      {/* Radio Options */}
      <div className={`${getWidthClass("radio_options")}`}>
        <p className="mb-1 text-sm font-medium text-gray-700">Radio Options</p>
        {options.map((opt) => (
          <label key={opt.value} className="inline-flex items-center mr-4">
            <input
              type="radio"
              value={opt.value}
              {...register("radio_options")}
              className="form-radio text-blue-600"
            />
            <span className="ml-2 text-sm">{opt.label}</span>
          </label>
        ))}
      </div>

      {/* Checkbox Options */}
      <div className={`${getWidthClass("checkbox_options")}`}>
        <p className="mb-1 text-sm font-medium text-gray-700">Checkbox Options</p>
        {options.map((opt) => (
          <label key={opt.value} className="inline-flex items-center mr-4">
            <input
              type="checkbox"
              {...register(`checkbox_${opt.value}`)}
              value={opt.value}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2 text-sm">{opt.label}</span>
          </label>
        ))}
      </div>

      {/* Acceptance Checkbox */}
      <div className={`${getWidthClass("acceptance")} mt-2`}>
        <label className="inline-flex items-start text-sm">
          <input
            type="checkbox"
            {...register("acceptance", { required: "You must accept the terms" })}
            className="form-checkbox mt-1 text-blue-600"
          />
          <span className="ml-2 text-gray-600">
            I accept the{" "}
            <a href="#" className="text-blue-600 underline">
              terms and conditions
            </a>
          </span>
        </label>
        {errors.acceptance && (
          <p className="text-red-500 text-xs">{errors.acceptance.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="w-full mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={!accepted}
        >
          Submit
        </button>
      </div>
    </form>
  );
}


