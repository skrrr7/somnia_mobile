import React, {useState} from 'react'
import NavigationBar from '../components/NavigationBar'
import background from '../assets/background.jpeg';
const Dashboard = () => {

  const [activeSection, setActiveSection] = useState("Take Test");

  return (
    
    <div className="min-h-screen flex items-center justify-center p-8"
     style={{
       backgroundImage: `url(${background})`,
       backgroundSize: 'cover',
       backgroundPosition: 'center',
       backgroundAttachment: 'fixed',
     }}>
      <NavigationBar/>
    <div className= "w-200 ml-10 h-150 mt-25 rounded-2xl p-6  bg-indigo-950/50 shadow-[-20px_0_25px_5px_rgba(255,255,255,0.5)]">
        <div onClick={() => setActiveSection("Take Test")} className="border-b border-white py-3 px-2 hover:bg-white/10 hover:rounded-md mb-5
        cursor-pointer transition duration-200 text-white font-bold tracking-wide font-sans text-center">Take Test</div>
        <div onClick={() => setActiveSection("Vitals")} className="border-b border-white py-3 px-2 hover:bg-white/10 hover:rounded-md mb-5
        cursor-pointer transition duration-200 text-white font-bold tracking-wide font-sans text-center">Vitals</div>
        <div onClick={() => setActiveSection("Statistics")} className="border-b border-white py-3 px-2 hover:bg-white/10 hover:rounded-md mb-5
        cursor-pointer transition duration-200 text-white font-bold tracking-wide font-sans text-center">Statistics</div>
        <div onClick={() => setActiveSection("Sleep History")} className="border-b border-white py-3 px-2 hover:bg-white/10 hover:rounded-md mb-5
        cursor-pointer transition duration-200 text-white font-bold tracking-wide font-sans text-center">Sleep History</div>
        <div onClick={() => setActiveSection("Sleep Recommendations")} className="border-b border-white py-3 px-2 hover:bg-white/10 hover:rounded-md mb-5
        cursor-pointer transition duration-200 text-white font-bold tracking-wide font-sans text-center">Sleep Recommendations</div>
        <div onClick={() => setActiveSection("AI Prediction")} className="border-b border-white py-3 px-2 hover:bg-white/10 hover:rounded-md mb-5
        cursor-pointer transition duration-200 text-white font-bold tracking-wide font-sans text-center">AI Prediction</div>
        
    </div>
    <div className="w-900 h-150 ml-10 mt-25 rounded-2xl p-6 shadow-2xl bg-indigo-950/50 shadow-[20px_0_25px_5px_rgba(255,255,255,0.5)]">
        {activeSection === "Take Test" && <div className="text-white"> Take Test Content</div>}
        {activeSection === "Vitals" && <div className="text-white"> Vitals Content</div>}
        {activeSection === "Statistics" && <div className="text-white"> Statistics Content</div>}
        {activeSection === "Sleep History" && <div className="text-white"> Sleep History Content</div>}
        {activeSection === "Sleep Recommendations" && <div className="text-white"> Sleep Recommendations Content</div>}
        {activeSection === "AI Prediction" && <div className="text-white"> AI Prediction Content</div>}       
  </div>
</div>

  )
}

export default Dashboard