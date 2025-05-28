import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  ChevronDownIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline';

const Help = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const categories = [
    { id: 'general', name: 'General', icon: QuestionMarkCircleIcon },
    { id: 'tracking', name: 'Sleep Tracking', icon: DocumentTextIcon },
    { id: 'technical', name: 'Technical', icon: VideoCameraIcon },
    { id: 'account', name: 'Account', icon: ChatBubbleLeftRightIcon },
  ];

  const faqs = {
    general: [
      {
        id: 1,
        question: 'How does SOMNiA track my sleep?',
        answer: 'SOMNiA uses data from your connected devices to monitor your sleep patterns, including duration, quality, and cycles. We analyze metrics like heart rate, movement, and breathing patterns to provide comprehensive sleep insights.',
      },
      {
        id: 2,
        question: 'What devices are compatible with SOMNiA?',
        answer: 'SOMNiA is compatible with most major smartwatches and fitness trackers, including Apple Watch, Fitbit, and Garmin devices. Check our device compatibility list for specific models.',
      },
    ],
    tracking: [
      {
        id: 3,
        question: 'How accurate is the sleep tracking?',
        answer: 'Our sleep tracking accuracy is typically above 90% when compared to clinical sleep studies. The accuracy depends on wearing your device properly and maintaining good contact with your skin.',
      },
      {
        id: 4,
        question: 'What metrics are tracked during sleep?',
        answer: 'We track multiple metrics including sleep duration, sleep stages (light, deep, REM), heart rate variability, breathing rate, and movement patterns.',
      },
    ],
    technical: [
      {
        id: 5,
        question: 'How do I sync my device with SOMNiA?',
        answer: 'Go to Settings > Connected Devices and follow the on-screen instructions to pair your device. Make sure Bluetooth is enabled on both your phone and tracking device.',
      },
    ],
    account: [
      {
        id: 6,
        question: 'How do I change my sleep goals?',
        answer: 'You can adjust your sleep goals in the Profile section. Navigate to Profile > Sleep Preferences to customize your target sleep duration and schedule.',
      },
    ],
  };

  const ContactCard = ({ icon: Icon, title, value, action, actionLabel }) => (
    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-800/50">
      <div className="flex items-start space-x-4">
        <div className="p-3 bg-blue-500/10 rounded-lg">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg text-white font-light">{title}</h3>
          <p className="text-gray-400 mt-1">{value}</p>
          <button
            onClick={action}
            className="mt-4 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors text-sm"
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A1628] p-8">
      {/* Background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-light text-white mb-4">Help & Support</h1>
          <p className="text-gray-400">Find answers to common questions or get in touch with our support team</p>
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

        {/* FAQs */}
        <div className="space-y-4">
          {faqs[selectedCategory].map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900/50 rounded-xl border border-gray-800/50 overflow-hidden"
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-white font-light">{faq.question}</span>
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    expandedFaq === faq.id ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {expandedFaq === faq.id && (
                <div className="px-6 pb-6 text-gray-400 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <ContactCard
            icon={EnvelopeIcon}
            title="Email Support"
            value="Get help via email with a response time of 24 hours"
            action={() => window.location.href = 'mailto:support@somnia.com'}
            actionLabel="Send Email"
          />
          <ContactCard
            icon={PhoneIcon}
            title="Phone Support"
            value="Speak directly with our support team"
            action={() => window.location.href = 'tel:+1234567890'}
            actionLabel="Call Now"
          />
        </div>
      </div>
    </div>
  );
};

export default Help; 