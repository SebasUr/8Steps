import React, { createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch((error) => {
            console.error(error)
            setIsAuthorized(false)
        })
    }, [])

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try {
            const response = await api.post("/users/api/token/refresh/", {
                refresh: refreshToken
            })
            if (response.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.error(error)
            setIsAuthorized(false)
        }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }

        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp
        const currentTime = Date.now() / 1000

        if (tokenExpiration < currentTime) {
            await refreshToken()
        } else {
            setIsAuthorized(true)
        }
    }

    return (
        <AuthContext.Provider value={{ isAuthorized, setIsAuthorized , auth }}>
            {children}
        </AuthContext.Provider>
    )
}