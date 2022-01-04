import { FC, useState } from "react";

// Redux
import { useDispatchedAction } from "../../../hooks/useDispatchedAction";

// libs
import { Modal } from "react-responsive-modal";

// Components
import { Button } from "../../ui/Button/Button";
import { UserForm } from "../UserForm/UserForm";

export const UserNotLogged: FC = () => {
    // ** Local State
    const [isLoginModalOpened, setIsLoginModalOpened] =
        useState<boolean>(false);
    const [isRegModalOpened, setIsRegModalOpened] = useState<boolean>(false);

    // Dispatch
    const { login, registration } = useDispatchedAction();
    return (
        <>
            <Button
                style={{ marginBottom: 20 }}
                onClick={() => setIsLoginModalOpened(true)}
            >
                Войти
            </Button>
            <Button onClick={() => setIsRegModalOpened(true)}>
                Зарегестрироваться
            </Button>
            <Modal
                open={isLoginModalOpened}
                onClose={() => setIsLoginModalOpened(false)}
                center
            >
                <UserForm submitHandler={login} submitBtnText="Войти" />
            </Modal>
            <Modal
                open={isRegModalOpened}
                onClose={() => setIsRegModalOpened(false)}
                center
            >
                <UserForm
                    submitHandler={registration}
                    submitBtnText="Зарегестрироваться"
                />
            </Modal>
        </>
    );
};
