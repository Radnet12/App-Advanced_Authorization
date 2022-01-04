// Axios
import $api from "../http/http";
import { AxiosResponse } from "axios";

// Types
import { IUser } from "../models/IUser";

export class UserService {
    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.post<IUser[]>("/users");
    }
}
