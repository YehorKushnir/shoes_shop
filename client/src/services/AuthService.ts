import type {User} from '../types/User.ts'
import $api from '../http'
import type {AxiosResponse} from 'axios'
import type {AuthResponse} from '../types/AuthResponse.ts'

export class AuthService {
    static async login(data: User): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post('/login', data)
    }
    static async register(data: User): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post('/login', data)
    }
    static async logout(data: User): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post('/login', data)
    }
    static async refresh(data: User): Promise<AxiosResponse<AuthResponse>> {
        return await $api.post('/refresh', data)
    }
}