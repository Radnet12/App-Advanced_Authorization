import { FC } from "react";

// Libs
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "../../ui/Button/Button";

// Components
import { FormInput } from "../../ui/FormInput/FormInput";

// Utils
import { formRules } from "../../../utils/formRules";

// Styles
import s from "./UserForm.module.scss";

// Types
import { IUserData } from "../../../models/IUserData";

interface UserFormProps {
    submitHandler: ({ email, password }: IUserData) => void;
    submitBtnText: string;
}

export const UserForm: FC<UserFormProps> = (props) => {
    // **props
    const { submitHandler, submitBtnText } = props;

    const methods = useForm<IUserData>();

    const onSubmit = methods.handleSubmit((data: IUserData) => {
        submitHandler({ email: data.email, password: data.password });
    });

    return (
        <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
                <FormInput
                    label="Введите почту"
                    name="email"
                    type="email"
                    rules={{ ...formRules.required("Заполните почту!") }}
                />
                <FormInput
                    label="Введите пароль"
                    name="password"
                    type="password"
                    rules={{
                        ...formRules.required("Заполните пароль!"),
                        ...formRules.minLength(
                            4,
                            "Минимальная длина 4 символа!"
                        ),
                        ...formRules.maxLength(
                            32,
                            "Максимальная длина 32 символа!"
                        ),
                    }}
                />
                <div className={s.btns}>
                    <Button type="submit">{submitBtnText}</Button>
                </div>
            </form>
        </FormProvider>
    );
};
