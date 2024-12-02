"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ModeToggle } from '@/components/theme-btn'
import LoadingBar from 'react-top-loading-bar'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setProgress(20)
    setTimeout(() => setProgress(40), 100)
    setTimeout(() => setProgress(100), 400)
  }, [pathname])

  useEffect(() => {
    setTimeout(() => setProgress(0), 50)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <LoadingBar
        color='#10B981'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-background/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="hidden md:flex space-x-6 items-center">
          <ModeToggle />
            {navItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <span className="text-foreground/80 hover:text-foreground transition-colors">
                    {item.name}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-400 transition-all group-hover:w-full"></span>
                </motion.div>
              </Link>
            ))}
          </div>
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-extrabold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text"
            >
              HealthFit
            </motion.div>
          </Link>
          <div className="md:hidden flex items-center">
            <ModeToggle />
            <Sheet>
              <SheetTrigger className="ml-4">
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 flex flex-col justify-center items-center"
                >
                  <span className="w-6 h-0.5 bg-foreground mb-1.5"></span>
                  <span className="w-6 h-0.5 bg-foreground"></span>
                </motion.div>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text mb-6">
                    HealthFit
                  </SheetTitle>
                  <SheetDescription>
                    <AnimatePresence>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
                        className="flex flex-col space-y-4"
                      >
                        {navItems.map((item) => (
                          <motion.div
                            key={item.name}
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Link href={item.href} className="text-lg font-medium text-foreground/80 hover:text-foreground transition-colors">
                              {item.name}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav>
    </>
  )
}

export default Navbar

