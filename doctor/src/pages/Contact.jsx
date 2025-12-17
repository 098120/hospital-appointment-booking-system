import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {

  return (
    <div>

      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>
          CONTACT <span className='text-gray-700 font-semibold'>US</span>
        </p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>

        <img
          className='w-full md:max-w-[360px]'
          src={assets.contact_image}
          alt="Contact"
        />

        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-600'>OUR OFFICE</p>

          <p className='text-gray-500'>
            S4709 Birat Teaching Hospital <br />
            Biratnagar, Nepal
          </p>

          <p className='text-gray-500'>
            Tel: +977 033245, 986754332 <br />
            Email: biratteachinghospital@gmail.com
          </p>

          <p className='font-semibold text-lg text-gray-600'>
            Careers at PRESCRIPTO
          </p>

          <p className='text-gray-500'>
            Learn more about our teams and job openings.
          </p>

          <button className='bg-primary text-white px-6 py-2 rounded-full hover:bg-blue-700'>
            Explore jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact
