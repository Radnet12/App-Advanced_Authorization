import { createAsyncThunk } from "@reduxjs/toolkit";

// Types
import { IUserData } from "../../../models/ILogin";

// API
import { AuthService } from "../../../services/AuthService";

export const login = createAsyncThunk(
    "user/loginUser",
    async ({ email, password }: IUserData, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(email, password);

            if (!response?.data) {
                throw response;
            }

            return response;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message);
        }
    }
);

export const registration = createAsyncThunk(
    "user/registerUser",
    async ({ email, password }: IUserData, { rejectWithValue }) => {
        try {
            const response = await AuthService.registration(email, password);

            if (!response?.data) {
                throw response;
            }

            return response;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message);
        }
    }
);

export const logout = createAsyncThunk(
    "user/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await AuthService.logout();

            return response;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message);
        }
    }
);
