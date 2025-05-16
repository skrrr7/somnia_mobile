import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MoonIcon,
  SunIcon,
  BeakerIcon,
  HeartIcon,
  BookOpenIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

const SleepTips = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Tips', icon: LightBulbIcon },
    { id: 'routine', name: 'Bedtime Routine', icon: MoonIcon },
    { id: 'environment', name: 'Sleep Environment', icon: SunIcon },
    { id: 'habits', name: 'Healthy Habits', icon: HeartIcon },
    { id: 'science', name: 'Sleep Science', icon: BeakerIcon },
  ];

  const tips = [
    {
      id: 1,
      category: 'routine',
      title: 'Consistent Sleep Schedule',
      description: 'Go to bed and wake up at the same time every day, even on weekends. This helps regulate your body\'s internal clock.',
      icon: MoonIcon,
    },
    {
      id: 2,
      category: 'environment',
      title: 'Optimal Room Temperature',
      description: 'Keep your bedroom temperature between 60-67°F (15-19°C) for optimal sleep conditions.',
      icon: SunIcon,
    },
    {
      id: 3,
      category: 'habits',
      title: 'Avoid Screen Time',
      description: 'Stop using electronic devices at least 1 hour before bedtime to reduce blue light exposure.',
      icon: HeartIcon,
    },
    {
      id: 4,
      category: 'science',
      title: 'Sleep Cycles',
      description: 'Understanding your sleep cycles can help you wake up feeling more refreshed. Each cycle lasts about 90 minutes.',
      icon: BeakerIcon,
    },
  ];

  const filteredTips = selectedCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === selectedCategory);

  const TipCard = ({ tip }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 rounded-xl p-6 border border-gray-800/50"
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-blue-500/10 rounded-lg">
          <tip.icon className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg text-white font-light mb-2">{tip.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{tip.description}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#0A1628] p-8">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-4 py-2 bg-blue-500/10 rounded-full mb-4"
          >
            <BookOpenIcon className="w-5 h-5 text-blue-400 mr-2" />
            <span className="text-blue-400 text-sm">Sleep Better Tonight</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-3xl font-light text-white mb-4"
          >
            Personalized Sleep Tips
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            Discover science-backed recommendations to improve your sleep quality and wake up feeling refreshed.
          </motion.p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  : 'bg-gray-900/50 text-gray-400 hover:bg-gray-900/70 border-gray-800/50'
              } border`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTips.map((tip) => (
            <TipCard key={tip.id} tip={tip} />
          ))}
        </div>

        {/* Daily Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-blue-500/20"
        >
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <LightBulbIcon className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg text-white font-light mb-2">Today's Sleep Challenge</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Try to reduce your screen time by 30 minutes before bedtime tonight. 
                Replace it with light reading or meditation to help your mind wind down.
              </p>
              <button className="mt-4 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors text-sm">
                Accept Challenge
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SleepTips; 