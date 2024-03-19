import axios from "axios"
import {jwtDecode} from "jwt-decode"
import dayjs from "dayjs"
import { useContext } from "react"
import  AuthContext  from "../context/Authcontext"

const baseURL ="http://127.0.0.1:8000/api/"

const useAxios = () => {
    const{authTokens, setUser, setAuthTokens}= useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers:{
            Authorization: `Bearer ${authTokens?.access}`
        }
    }).access

    axiosInstance.interceptors.request.use(async req =>{
        const user = jwtDecode(authTokens.access)
        const isExpire = dayjs.unix(user.exp).diff(dayjs()) < 1

        if(isExpire) return req

        const response  = await axios.post('${baseURL}/token/refresh/',{
            refresh: authTokens.refresh
        })
        localStorage.setItem("authTokens", JSON.stringify(response.data))
        // localStorage.setItem("authTokens", JSON.stringify(response.data))

        //localStorage.setItem("access", response.data.access)
        //localStorage.setItem("refrest", response.data.refresh)

        setAuthTokens(response.data)
        setUser(jwtDecode(response.data.access))

        req.headers.Authorization = `Bearer ${response.data.access}`
        return req
    })

    return axiosInstance
}

export default useAxios
