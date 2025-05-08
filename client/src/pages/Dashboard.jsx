import React, {useState} from 'react'
import NavigationBar from '../components/NavigationBar'
import HealthOverview from '../components/HealthOverview'
const Dashboard = () => {

  const[activation, setActivation] = useState("Health Overview")
  return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <NavigationBar/>
    <div className= "w-200 mr-2 ml-10 min-h-160 mt-15 p-6 bg-slate-950 border border-black">

      <div className="w-30 h-30 rounded-full bg-white mx-auto p-1 mb-1"></div>
      <div className="text-lg font-medium text-center text-white p-1 mb-1">John Doe</div>
      <div className="text-green-400 text-sm mx-auto w-fit p-1 mb-5">Verified</div>

      <div onClick={() => setActivation("Health Overview")} 
      className='text-center border border-3 border-slate-800 text-white p-5 mb-5'>Health Overview</div>

      <div onClick={() => setActivation("AI Prediction")} 
      className='text-center border border-3 border-slate-800 text-white p-5 mb-5'>AI Prediction</div>

      <div onClick={() => setActivation("Sleep History")} 
      className='text-center border border-3 border-slate-800 text-white p-5 mb-5'>Sleep History</div>

      <div onClick={() => setActivation("Statistics")} 
      className='text-center border border-3 border-slate-800 text-white p-5 mb-5'>Statistics</div>

    </div>

    <div className= "w-900 mr-5 ml-2 h-160 mt-15 p-6 bg-slate-950 border border-black overflow-y-auto">
      {activation === "Health Overview" && (<HealthOverview/>)}

    </div>

    
</div>

  )
}

export default Dashboard