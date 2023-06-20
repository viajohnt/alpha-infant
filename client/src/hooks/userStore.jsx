import { create } from 'zustand'
import {devtools, persist} from 'zustand/middleware'

const userStore = (set) => ({
    user: null,
    setUser: (newUser) => {set(() => ({user: newUser}))}
})

const useUserStore = create(
    devtools(
        persist(userStore, {
            name: "user",
        })
    )
)

export default useUserStore