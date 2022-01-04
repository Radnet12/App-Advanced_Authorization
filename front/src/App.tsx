import { FC, useEffect } from "react";

// Redux
import { useTypedSelector } from "./hooks/useTypedSelector";
import { useDispatchedAction } from "./hooks/useDispatchedAction";

// Libs
import { ToastContainer, toast } from "react-toastify";

// Components
import { UserLogged } from "./components/common/UserLogged/UserLogged";
import { UserNotLogged } from "./components/common/UserNotLogged/UserNotLogged";

export const App: FC = () => {
    // **Redux state
    const { isAuth, isUserLoading, isError } = useTypedSelector(
        (state) => state.user
    );

    // Dispatch
    const { checkAuth } = useDispatchedAction();

    // Check if user is authenticated
    useEffect(() => {
        if (localStorage.getItem("token")) {
            checkAuth();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handling error
    useEffect(() => {
        if (isError) {
            toast.error(isError);
        }
    }, [isError]);

    if (isUserLoading) {
        return <div className="wrapper">Идёт загрузка...</div>;
    }

    return (
        <>
            <div className="wrapper">
                {isAuth ? <UserLogged /> : <UserNotLogged />}
            </div>
            <ToastContainer />
        </>
    );
};
