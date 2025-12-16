import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctor = () => {

  const { speciality } = useParams()

  // get doctors from context
  const { doctors } = useContext(AppContext)

  // state
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()

  // filter doctors based on speciality
  useEffect(() => {
    if (speciality) {
      const filtered = doctors.filter(
        (doc) => doc.speciality.toLowerCase() === speciality.toLowerCase()
      )
      setFilterDoc(filtered)
    } else {
      setFilterDoc(doctors)
    }
  }, [doctors, speciality])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctor specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        {/* Left Section */}
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          <p className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border boerder-gray-300 rounded transition-all cursor-pointer'}>General physician</p>
          <p className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border boerder-gray-300 rounded transition-all cursor-pointer'}>Gynecologist</p>
          <p className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border boerder-gray-300 rounded transition-all cursor-pointer'}>Dermatologist</p>
          <p className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border boerder-gray-300 rounded transition-all cursor-pointer'}>Pediatrician</p>
          <p className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border boerder-gray-300 rounded transition-all cursor-pointer'}>Neurologist</p>
          <p className={'w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border boerder-gray-300 rounded transition-all cursor-pointer'}>Gastroenterologist</p>
        </div>

        {/* Right Section */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500'
            >
              <img
                className='bg-blue-50 w-full'
                src={item.image}
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
    </div>
  )
}

export default Doctor
