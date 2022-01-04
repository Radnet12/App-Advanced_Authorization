export const formRules = {
    required: (message: string) => ({
        required: {
            value: true,
            message,
        },
    }),
    maxLength: (value: number, message: string) => ({
        maxLength: {
            value,
            message,
        },
    }),
    minLength: (value: number, message: string) => ({
        minLength: {
            value,
            message,
        },
    }),
};
