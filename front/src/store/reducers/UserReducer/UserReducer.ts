import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interface
import { UserState } from "./UserReducerTypes";
import { AuthResponse } from "../../../models/response/AuthResponse";

// Thunks
import { login, registration, logout, checkAuth, getUsers } from "./UserReducerThunks";
import { IUser } from "../../../models/IUser";

const initialState: UserState = {
    user: {
        id: "",
        email: "",
        isActivated: false,
    },
    isAuth: false,
    isError: null,
    isUserLoading: false,
    users: [],
    isUsersLoading: false,
    isUsersError: null
};

const UserReducer = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: {
        [login.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isUserLoading = false;
            state.isError = action.payload;
        },
        [login.fulfilled.type]: (
            state,
            action: PayloadAction<AuthResponse>
        ) => {
            localStorage.setItem("token", action.payload.accessToken);
            state.user = action.payload.user;
            state.isAuth = true;
            state.isError = null;
            state.isUserLoading = false;
        },
        [login.pending.type]: (state) => {
            state.isUserLoading = true;
        },

        [registration.rejected.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.isUserLoading = false;
            state.isError = action.payload;
        },
        [registration.fulfilled.type]: (
            state,
            action: PayloadAction<AuthResponse>
        ) => {
            localStorage.setItem("token", action.payload.accessToken);
            state.user = action.payload.user;
            state.isAuth = true;
            state.isError = null;
            state.isUserLoading = false;
        },
        [registration.pending.type]: (state) => {
            state.isUserLoading = true;
        },

        [logout.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isUserLoading = false;
            state.isError = action.payload;
        },
        [logout.fulfilled.type]: (state) => {
            localStorage.removeItem("token");
            state.user = {
                id: "",
                email: "",
                isActivated: false,
            };
            state.isAuth = false;
            state.isError = null;
            state.isUserLoading = false;
        },
        [logout.pending.type]: (state) => {
            state.isUserLoading = true;
        },

        [checkAuth.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isUserLoading = false;
            state.isError = action.payload;
        },
        [checkAuth.fulfilled.type]: (
            state,
            action: PayloadAction<AuthResponse>
        ) => {
            localStorage.setItem("token", action.payload.accessToken);
            state.user = action.payload.user;
            state.isAuth = true;
            state.isError = null;
            state.isUserLoading = false;
        },
        [checkAuth.pending.type]: (state) => {
            state.isUserLoading = true;
        },

        [getUsers.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isUsersLoading = false;
            state.isUsersError = action.payload;
        },
        [getUsers.fulfilled.type]: (
            state,
            action: PayloadAction<IUser[]>
        ) => {
            state.users = action.payload;
            state.isUsersError = null;
            state.isUsersLoading = false;
        },
        [getUsers.pending.type]: (state) => {
            state.isUsersLoading = true;
        },
    },
});

export const UserReducerActions = {
    ...UserReducer.actions,
    login,
    logout,
    registration,
    checkAuth,
    getUsers,
};
export default UserReducer.reducer;
