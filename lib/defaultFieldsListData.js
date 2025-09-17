const defaultFieldsListData = [
    {
        type: "text",
        label: "Label",
        placeholder: "placeholder",
        required: true,
        columnWidth: "50%"
    },
    {
        type: "email",
        label: "Email",
        placeholder: "Your Email Address",
        required: true,
        columnWidth: "50%"
    },
    {
        type: "time",
        label: "Time",
        required: false,
        columnWidth: "50%"
    },
    {
        type: "date",
        label: "Date",
        required: false,
        columnWidth: "50%"
    },
    {
        type: "radio",
        label: "Radio Input",
        options: [
            "Option 1=option1",
            "Option 2=option2",
            "Option 3=option3",
        ],
        required: false
    },
    {
        type: "checkbox",
        label: "Checkbox Input",
        options: [
            "Option 1=option1",
            "Option 2=option2",
            "Option 3=option3",
        ],
        required: false
    },
    {
        type: "file",
        label: "Upload",
        required: false,
        columnWidth: "33%"
    },
    {
        type: "select",
        label: "Select",
        placeholder: "Select",
        options: [
            "Option 1=option1",
            "Option 2=option2",
            "Option 3=option3",
        ],
        required: false,
        columnWidth: "66%"
    },
    {
        type: "acceptance",
        content: "<p><strong>I agree with all terms and conditions.</strong></p>\n",
        required: true,
        columnWidth: "100%"
    }
];

export default defaultFieldsListData;