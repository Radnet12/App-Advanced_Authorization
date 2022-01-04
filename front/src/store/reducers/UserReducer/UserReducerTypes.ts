import { IUser } from "../../../models/IUser";

export interface UserState {
    user: IUser;
    isAuth: boolean;
    isError: null | string;
    isUserLoading: boolean;
    users: IUser[];
    isUsersLoading: boolean;
    isUsersError: null | string;
}