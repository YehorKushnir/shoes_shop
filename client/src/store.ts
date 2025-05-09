import {create} from 'zustand/react'
import type {AuthResponse} from './types/AuthResponse.ts'

type State = {
    user: null
    login: (data: AuthResponse) => Promise<void>
}

export const store = create<State>((_set, _get) => ({
    user: null,
    loading: true,
    login: async (data) => {

    }
}))