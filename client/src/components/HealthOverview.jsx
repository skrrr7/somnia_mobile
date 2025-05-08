import React from 'react'

const Vitals = () => {
  return (
    <div className='grid grid-cols-2 gap-4 mt-2'>
    
      <div className="bg-gray-900/60 h-45 p-5 rounded-2xl shadow-lg bg-rose-500">
        <h2 className="text-xl font-semibold mb-2 text-white">Heart Rate</h2>
        <p className="text-2xl font-bold text-white">72 bpm</p>
        <p className='text-center text-2xl'>❤️</p>
      </div>

      <div className="bg-gray-900/60 p-5 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-center text-white">Steps Today</h2>
        <p className="text-2xl font-bold text-center text-white">5,432</p>
        <p className='text-center text-2xl'>❤️</p>
      </div>

      <div className="bg-gray-900/60 h-45 p-5 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-center text-white">Calories Burned</h2>
        <p className="text-2xl font-bold text-center text-white">5,432</p>
        <p className='text-center text-2xl'>❤️</p>
      </div>

      <div className="bg-gray-900/60 p-5 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-center text-white">Steps Today</h2>
        <p className="text-2xl font-bold text-center text-white">5,432</p>
        <p className='text-center text-2xl'>❤️</p>
      </div>

      <div className="bg-gray-900/60 h-45 p-5 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-center text-white">Weight</h2>
        <p className="text-2xl font-bold text-center text-white">75 kg</p>
        <p className='text-center text-2xl'>❤️</p>
      </div>

      <div className="bg-gray-900/60 p-5 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-2 text-center text-white">Height</h2>
        <p className="text-2xl font-bold text-center text-white">182 cm</p>
        <p className='text-center text-2xl'>❤️</p>
      </div>

    </div>
  )
}

export default Vitals
