import { createContext, useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const currencySymbol = '₹'
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const [doctorList, setDoctorList] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') || false)

  // ---------------- Get Doctors ----------------
  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/api/doctor/list`
      )

      if (data.success) {
        setDoctorList(data.doctors)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const value = {
    doctorList,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    getDoctorsData
  }

  // ---------------- Load On Start ----------------
  useEffect(() => {
    getDoctorsData()
  }, [])

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
