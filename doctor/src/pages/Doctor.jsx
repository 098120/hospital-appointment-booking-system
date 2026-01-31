import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctor = () => {

  const { speciality } = useParams()
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  // helper
  const isActive = (name) => speciality === name

  // filter doctors
  useEffect(() => {
    if (speciality) {
      const formatted = speciality.replace('-', ' ')
      const filtered = doctors.filter(
        (doc) => doc.speciality.toLowerCase() === formatted.toLowerCase()
      )
      setFilterDoc(filtered)
    } else {
      setFilterDoc(doctors)
    }
  }, [doctors, speciality])

  return (
    <div>
      <p className="text-gray-600">Browse through the doctor specialist.</p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">

        {/* MOBILE FILTER BUTTON */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden
            ${showFilters ? 'bg-primary text-white' : ''}`}
          onClick={() => setShowFilters(prev => !prev)}
        >
          Filters
        </button>

        {/* ---------- Left Section ---------- */}
        <div
          className={`flex flex-col gap-4 text-sm text-gray-600
            ${showFilters ? 'flex' : 'hidden'} sm:flex`}
        >
          {[
            'General-Physician',
            'Gynecologist',
            'Dermatologist',
            'Pediatrician',
            'Neurologist',
            'Gastroenterologist',
          ].map((item) => (
            <p
              key={item}
              onClick={() =>
                speciality === item
                  ? navigate('/doctor')
                  : navigate(`/doctor/${item}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border rounded
                transition-all cursor-pointer
                ${
                  isActive(item)
                    ? 'bg-indigo-100 text-black border-indigo-300'
                    : 'border-gray-300 hover:bg-gray-100'
                }`}
            >
              {item.replace('-', ' ')}
            </p>
          ))}
        </div>

        {/* ---------- Right Section ---------- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filterDoc.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer
                         hover:-translate-y-2 transition-all duration-500"
            >
              <img
                className="bg-blue-50 w-full"
                src={item.image}
                alt={item.name}
              />

              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-500 mb-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <p>Available</p>
                </div>

                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Doctor

