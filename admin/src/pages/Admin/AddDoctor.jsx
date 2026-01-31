import React, { useState, useContext } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

    const [docImage, setDocImage] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 Year')
    const [fees, setFees] = useState('')
    const [specialization, setSpecialization] = useState('General Physician')
    const [education, setEducation] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [about, setAbout] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (!docImage) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData()

            formData.append('docImage', docImage)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', fees)
            formData.append('specialization', specialization)
            formData.append('education', education)
            formData.append('about', about)
            formData.append(
                'address',
                JSON.stringify({ line1: address1, line2: address2 })
            )

            const { data } = await axios.post(
                backendUrl + '/api/admin/add-doctor',
                formData,
                { headers: { aToken } }
            )

            if (data.success) {
                toast.success(data.message)
                setDocImage(false)
                setName('')
                setEmail('')
                setPassword('')
                setExperience('1 Year')
                setFees('')
                setSpecialization('General Physician')
                setEducation('')
                setAddress1('')
                setAddress2('')
                setAbout('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='m-5 w-full'>
            <p className='mb-3 text-lg font-medium'>Add Doctor</p>

            <div className='bg-white px-8 py-8 w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>

                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor="doc-img">
                        <img
                            className='w-16 bg-gray-100 rounded-full cursor-pointer'
                            src={docImage ? URL.createObjectURL(docImage) : assets.upload_area}
                            alt=""
                        />
                    </label>
                    <input
                        type="file"
                        id="doc-img"
                        hidden
                        onChange={(e) => setDocImage(e.target.files[0])}
                    />
                    <p>Upload doctor <br /> picture</p>
                </div>

                <div className='flex flex-col lg:flex-row gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <input
                            className='border rounded px-3 py-2'
                            type="text"
                            placeholder='Doctor Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            className='border rounded px-3 py-2'
                            type="email"
                            placeholder='Doctor Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <input
                            className='border rounded px-3 py-2'
                            type="password"
                            placeholder='Doctor Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <select
                            className='border rounded px-3 py-2'
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                        >
                            {[...Array(10)].map((_, i) => (
                                <option key={i} value={`${i + 1} Year`}>
                                    {i + 1} Year
                                </option>
                            ))}
                        </select>

                        <input
                            className='border rounded px-3 py-2'
                            type="number"
                            placeholder='Fees'
                            value={fees}
                            onChange={(e) => setFees(e.target.value)}
                            required
                        />

                    </div>

                    <div className='w-full lg:flex-1 flex flex-col gap-4'>

                        <select
                            className='border rounded px-3 py-2'
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                        >
                            <option>General Physician</option>
                            <option>Gynecologist</option>
                            <option>Dermatologist</option>
                            <option>Pediatrician</option>
                            <option>Neurologist</option>
                            <option>Gastroenterologist</option>
                        </select>

                        <input
                            className='border rounded px-3 py-2'
                            type="text"
                            placeholder='Education'
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            required
                        />

                        <input
                            className='border rounded px-3 py-2'
                            type="text"
                            placeholder='Address Line 1'
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                            required
                        />

                        <input
                            className='border rounded px-3 py-2'
                            type="text"
                            placeholder='Address Line 2'
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                            required
                        />

                    </div>
                </div>

                <p className='mt-4 mb-2'>About Doctor</p>
                <textarea
                    className='w-full px-4 pt-2 border rounded'
                    rows={5}
                    placeholder='Write About Doctor'
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    required
                />

                {/* ✅ Button placed after About Doctor */}
                <button
                    type="submit"
                    className='mt-5 px-10 py-3 border-2 border-blue-500 text-blue-500 rounded-full cursor-pointer hover:bg-blue-500 hover:text-white transition'
                >
                    Add Doctor
                </button>

            </div>
        </form>
    )
}

export default AddDoctor
