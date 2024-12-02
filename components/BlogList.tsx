'use client'

import React from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link';
import CommentComponent from '@/components/Comment';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, User } from 'lucide-react';
import { BlogData } from './BlogData';

interface BlogListProps {
  blogs: BlogData[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-5xl font-extrabold text-center mb-12 text-green-800 dark:text-green-200">
          Health & Fitness Blog
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
                <CardHeader className="p-0">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-2xl font-bold mb-3 text-green-700 dark:text-green-300">
                    {blog.title}
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{blog.description}</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <User className="mr-2 h-4 w-4" />
                    <span className="mr-4">{blog.author}</span>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>
                      {new Date(blog.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <Link href={`/blogpost/${blog.slug}`} passHref>
                    <Button variant="outline">Read More</Button>
                  </Link>
                  <CommentComponent slug={blog.slug} />
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BlogList;

