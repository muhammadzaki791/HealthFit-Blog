"use client"

import { Button } from "@/components/ui/button"
import { Heart, Apple, Dumbbell } from 'lucide-react'
import Link from "next/link"
import { motion } from "framer-motion"

export default function About() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-green-800 dark:text-green-200">
          About Our Health & Fitness Journey
        </h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-center mb-12 max-w-3xl mx-auto text-gray-700 dark:text-gray-300"
        >
          Welcome to our vibrant health and fitness community. We are dedicated to helping you achieve your wellness goals through expert advice, inspiring stories, and cutting-edge fitness trends.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <feature.icon className="w-16 h-16 mb-6 text-green-500 dark:text-green-400" />
              <h3 className="text-2xl font-semibold mb-3 text-green-700 dark:text-green-300">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link href="/blog">
            <Button className="group bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105" size="lg">
              Start Your Journey
              <Heart className="ml-2 h-5 w-5 group-hover:text-red-400 transition-colors" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

const features = [
  {
    icon: Apple,
    title: "Nutrition Guidance",
    description: "Expert advice on balanced diets, meal planning, and nutritious recipes for optimal health."
  },
  {
    icon: Dumbbell,
    title: "Fitness Programs",
    description: "Tailored workout routines for all levels, from beginners to advanced fitness enthusiasts."
  },
  {
    icon: Heart,
    title: "Wellness Tips",
    description: "Holistic approaches to mental and physical well-being, including stress management and mindfulness."
  }
]

