import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {

  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()
  const [relDoc, setRelDocs] = useState([])

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorData = doctors.filter(
        (doc) =>
          doc.speciality?.toLowerCase() === speciality?.toLowerCase() &&
          doc._id !== docId
      )
      setRelDocs(doctorData)
    }
  }, [doctors, speciality, docId])

  if (relDoc.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-10">
        No related doctors found
      </p>
    )
  }

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>

      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>

      <p className='sm:w-1/3 text-center text-sm'>
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0 w-full'>
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`)
              window.scrollTo(0, 0)
            }}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500'
          >
            <img
              className='bg-blue-50 w-full'
              src={item.image || '/doctors/default.png'}
              alt={item.name}
            />

            <div className='p-4'>
              <div className='flex items-center gap-2 text-sm text-green-500 mb-1'>
                <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                <p>Available</p>
              </div>

              <p className='font-medium'>{item.name}</p>
              <p className='text-sm text-gray-500'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default RelatedDoctors
