import React from 'react'

function ForgotPassword() {
  return (
    <div>
        <div>
          <label className='font-semibold'>Email:</label>
          <input
            type='text'
            name='email'
            value={inputValue.email}
            onChange={inputChangeHandler}
            placeholder='Enter your email'
            className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500'
          />
          {errors.email && <span className='text-red-600'>{errors.email}</span>}
        </div>
    </div>
  )
}

export default ForgotPassword