import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {

  const { DocId } = useParams()
  const { doctorList, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext) // ✅ fixed line
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  // ---------------- Fetch Doctor Info ----------------
  const fetchDocInfo = useCallback(() => {
    const selectedDoctor = doctorList.find(doc => doc._id === DocId)
    setDocInfo(selectedDoctor)
  }, [doctorList, DocId])

  // ---------------- Generate Available Slots ----------------
  const getAvailableSlots = useCallback(() => {
    if (!docInfo) return

    const slots = []
    const today = new Date()

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      if (i === 0) {
        const nextHour = currentDate.getHours() + 1
        currentDate.setHours(nextHour > 10 ? nextHour : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      const endTime = new Date(currentDate)
      endTime.setHours(21, 0, 0, 0)

      const daySlots = []

      while (currentDate < endTime) {
        daySlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })
        })
        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      slots.push(daySlots)
    }

    setDocSlots(slots)
  }, [docInfo])

  const bookAppointment  = async () => {
    if(!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    try {

      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      // ✅ Fix: properly concatenate date
      const slotDate = day + "_" + month + "_" + year

      // ✅ Fix: proper string quotes and headers
      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { docId: DocId, slotTime, slotDate },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        getDoctorsData() 
        navigate('/appointments')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
      
  }


  // ---------------- Effects ----------------
  useEffect(() => {
    if (doctorList.length > 0) fetchDocInfo()
  }, [doctorList, DocId, fetchDocInfo])

  useEffect(() => {
    if (docInfo) getAvailableSlots()
  }, [docInfo, getAvailableSlots])

  // ---------------- Render ----------------
  return docInfo && (
    <div>

      {/* Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />

        <div className='flex-1 border border-gray-400 rounded-lg p-8 bg-white'>
          <p className='flex items-center gap-2 text-2xl font-medium'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>

          <p className='text-sm text-gray-600 mt-1'>
            {docInfo.degree} - {docInfo.speciality}
          </p>

          <p className='text-gray-500 mt-3'>{docInfo.about}</p>

          <p className='mt-4'>
            Appointment fee:
            <span className='font-medium'> {currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='mt-6'>
        <p className='font-medium'>Booking Slots</p>

        <div className='flex gap-3 overflow-x-scroll mt-4'>
          {docSlots.map((day, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`py-4 px-3 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border'}`}
            >
              <p>{daysOfWeek[day[0]?.datetime.getDay()]}</p>
              <p>{day[0]?.datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className='flex gap-3 overflow-x-scroll mt-4'>
          {docSlots[slotIndex]?.map((slot, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(slot.time)}
              className={`px-5 py-2 rounded-full cursor-pointer border ${
                slot.time === slotTime ? 'bg-primary text-white' : 'text-gray-400'
              }`}
            >
              {slot.time}
            </p>
          ))}
        </div>

        <button onClick={bookAppointment} className='bg-primary text-white px-14 py-3 rounded-full my-6'>
          Book an appointment
        </button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors docId={DocId} speciality={docInfo.speciality} />

    </div>
  )
}

export default Appointment