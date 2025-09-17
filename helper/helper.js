export const prepareOptions = (options) => {
    return options.map((option) => {
        const [label, value] = option.split("=");
        return {
            label: label.trim(),
            value: value.trim(),
        };
    });
};
