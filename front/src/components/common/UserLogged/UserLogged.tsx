import { FC, useEffect } from "react";

// Redux
import { useDispatchedAction } from "../../../hooks/useDispatchedAction";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

// Libs
import { toast } from "react-toastify";

// Components
import { Button } from "../../ui/Button/Button";

export const UserLogged: FC = () => {
    // **Redux state
    const { user, isUsersError, isUsersLoading, users } = useTypedSelector(
        (state) => state.user
    );

    // Dispatch
    const { logout, getUsers } = useDispatchedAction();

    // Handling error
    useEffect(() => {
        if (isUsersError) {
            toast.error(isUsersError);
        }
    }, [isUsersError]);

    return (
        <>
            <h1>Ваша почта: {user.email}</h1>
            <div style={{marginBottom: 20}}>
                {user.isActivated
                    ? "Ваш аккаунт активирован!"
                    : "Ваш аккаунт не активирован!"}
            </div>
            <Button style={{marginBottom: 20}} onClick={() => logout()}>Выйти</Button>
            <Button onClick={() => getUsers()}>
                Получить всех пользователей
            </Button>
            {isUsersLoading ? (
                "Идёт процесс получение пользователей..."
            ) : (
                <ul style={{marginTop: 20}}>
                    {users.map((user) => (
                        <li style={{marginBottom: 8}}>
                            <div>Почта: {user.email}</div>
                            <div>
                                Активированный:{" "}
                                {user.isActivated ? "Да" : "Нет"}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};
