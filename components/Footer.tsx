"use client"

import React from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Linkedin, Github, Instagram, Heart } from 'lucide-react'
import { motion } from "framer-motion"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-zaki-444244302", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/muhammadzaki791", label: "GitHub" },
    { icon: Instagram, href: "https://www.instagram.com/muhammad_zaki791/", label: "Instagram" },
  ]

  const footerLinks = [
    { href: "/blogpost/fitness-myths-debunked", label: "Fitness Myths" },
    { href: "/blogpost/physical-activity-mental-health", label: "Physical and Mental Health" },
    { href: "/blogpost/hiit-workout-guide", label: "HIIT Workout Guide" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <footer className="z-auto bg-gradient-to-b from-green-100 to-green-200 dark:from-green-900 dark:to-green-800">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-3 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center">
                <Heart className="h-8 w-8 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  HealthFit
                </span>
              </Link>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Empowering you to live your healthiest life
              </p>
            </motion.div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="text-base text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 sm:flex sm:max-w-md"
            >
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <Input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full px-5 py-3 placeholder-gray-500 focus:ring-green-500 focus:border-green-500 sm:max-w-xs border-gray-300 rounded-md"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <Button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Subscribe
                </Button>
              </div>
            </motion.form>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className="sr-only">{social.label}</span>
                  <social.icon className="h-6 w-6" aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-8 md:flex md:items-center md:justify-between"
        >
          <div className="flex space-x-6 md:order-2">
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 text-sm"
            >
              Terms of Service
            </Link>
          </div>
          <p className="mt-8 text-base text-gray-600 dark:text-gray-300 md:mt-0 md:order-1">
            © {currentYear} HealthFit. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

