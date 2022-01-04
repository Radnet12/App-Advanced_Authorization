import { FC } from "react";

// Libs
import { useFormContext, RegisterOptions } from "react-hook-form";

// Styles
import s from "./FormInput.module.scss";

interface FormInputProps {
    name: string;
    label: string;
    type: string;
    rules: RegisterOptions;
}

export const FormInput: FC<FormInputProps> = (props) => {
    // **Props
    const { name, type, label, rules } = props;
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <div className={s.wrapper}>
            <label className={s.label}>
                <span className={s.span}>{label}</span>
                <input
                    {...register(name, rules)}
                    className={s.input}
                    type={type}
                />
            </label>
            {!!errors[name] && (
                <p className={s.error}>{errors[name]?.message}</p>
            )}
        </div>
    );
};
