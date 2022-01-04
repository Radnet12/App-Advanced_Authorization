// Libs
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Types
import { IUserData } from "../../../models/IUserData";
import { AuthResponse } from "../../../models/response/AuthResponse";

// API
import { AuthService } from "../../../services/AuthService";
import { UserService } from "../../../services/UserService";
import { API_URL } from "../../../http/http";

export const login = createAsyncThunk(
    "user/loginUser",
    async ({ email, password }: IUserData, { rejectWithValue }) => {
        try {
            const response = await AuthService.login(email, password);

            if (!response?.data) {
                throw response;
            }

            return response.data;
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

            return response.data;
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

export const checkAuth = createAsyncThunk(
    "user/checkAuthUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get<AuthResponse>(
                `${API_URL}/refresh`,
                { withCredentials: true }
            );

            if (!response?.data) {
                throw response;
            }

            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message);
        }
    }
);

export const getUsers = createAsyncThunk(
    "user/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await UserService.getUsers();

            if (!response?.data) {
                throw response;
            }

            return response.data;
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message);
        }
    }
);