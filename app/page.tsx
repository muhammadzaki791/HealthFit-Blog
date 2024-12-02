"use client";
import { Button } from "@/components/ui/button";
import CommentComponent from "@/components/Comment";
import Link from "next/link";
import Typed from "typed.js";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Dumbbell, Apple, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const el = useRef(null);
  const [bgImage, setBgImage] = useState("/Egg-Avocado-Toast.jpeg"); // Initial background image
  const images = ["/lifting-weights.avif", "/pic2.webp", "/group-fitness.webp","/breathing-exercises.webp"]; // Array of images for background

  useEffect(() => {
    // Set interval to change background image every 5 seconds
    const interval = setInterval(() => {
      setBgImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length; // Cycle through images
        return images[nextIndex];
      });
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Clean up on unmount
  });

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Transform Your Body.",
        "Nourish Your Soul.",
        "Embrace a Healthier Lifestyle.",
        "Achieve Your Fitness Goals.",
        "Discover the Power of Wellness.",
      ],
      typeSpeed: 50,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <main className="bg-gradient-to-b from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900">
      <section
        className="relative min-h-screen w-full flex items-center py-16 px-4"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 text-center lg:text-left"
            >
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                <span className="block mb-2">Elevate Your Health:</span>
                <span className="text-blue-300">
                  <span ref={el} />
                </span>
              </h1>
              <p className="mt-6 text-xl text-gray-200">
                Embark on a journey to optimal health with expert advice,
                inspiring stories, and cutting-edge fitness trends. Your path to
                a better you starts here.
              </p>
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Link href="/blog" passHref>
                  <Button className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-full hover:from-green-600 hover:to-blue-600 transform transition duration-300 hover:scale-105 backdrop-blur-sm">
                    Start Your Journey
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-green-800 dark:text-green-200">
              Featured Articles
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Discover our most popular health and fitness content
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800 h-full flex flex-col">
                  <CardHeader className="p-0 h-64 relative">
                    <Image
                      src={article.image}
                      alt={article.title}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-500 text-white dark:bg-green-700 px-2 py-1">
                        Featured
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <div className="flex justify-between items-center mb-4">
                      <Badge
                        variant="outline"
                        className="text-green-600 dark:text-green-400 border-green-600 dark:border-green-400"
                      >
                        {article.title}
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl font-bold mb-3 text-green-700 dark:text-green-300">
                      {article.title}
                    </CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      By <span className="font-semibold">{article.author}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 bg-green-50 dark:bg-green-900 mt-auto">
                    <div className="w-full flex flex-col justify-between items-center">
                      <Button
                        asChild
                        variant="ghost"
                        className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                      >
                        <Link href={article.link}>Read More</Link>
                      </Button>
                      <CommentComponent slug={article.link} />
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-green-100 dark:bg-green-800">
        <div className="container px-4 mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-green-800 dark:text-green-200">
              Our Focus Areas
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Comprehensive approach to your health and fitness
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-3">
            {focusAreas.map((area, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg dark:bg-gray-700"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <area.icon className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-semibold text-center text-green-800 dark:text-green-200">
                  {area.title}
                </h3>
                <p className="mt-2 text-center text-gray-600 dark:text-gray-300">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

const featuredArticles = [
  {
    title: "The Role of Supplements in Fitness",
    author: "Muhammad Zaki",
    description:
      "Understanding the importance and proper use of supplements in fitness and workout routines",
    link: "/blogpost/fitness-supplements",
    image: "/supplements.jpg",
  },
  {
    title: "10 High-Protein Breakfast Ideas for a Healthy Start",
    author: "Muhammad Zaki",
    description:
      "Discover delicious and nutritious high-protein breakfast recipes that will keep you energized throughout the day.",
    link: "/blogpost/high-protein-breakfast-ideas",
    image: "/pic1.jpeg",
  },
  {
    title: "The Connection Between Physical Activity and Mental Health",
    author: "Muhammad Zaki",
    description:
      "Explore the profound impact of physical activity on mental well-being",
    link: "/blogpost/physical-activity-mental-health",
    image: "/Physical-Mental-Health.webp",
  },
];

const focusAreas = [
  {
    icon: Dumbbell,
    title: "Fitness",
    description:
      "Tailored workout plans and exercise tips for all fitness levels.",
  },
  {
    icon: Apple,
    title: "Nutrition",
    description: "Expert advice on balanced diets and healthy eating habits.",
  },
  {
    icon: Heart,
    title: "Wellness",
    description: "Holistic approaches to mental and physical well-being.",
  },
];
