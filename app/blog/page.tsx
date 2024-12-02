import fs from "fs";
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import CommentComponent from '@/components/Comment';

interface BlogData {
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  slug: string;
  category: string;
}

const dirContent = fs.readdirSync("content", "utf-8");

const blogs: BlogData[] = dirContent.map(file => {
  const fileContent = fs.readFileSync(`content/${file}`, "utf-8");
  const { data } = matter(fileContent);
  return data as BlogData;
});

export default function Blog() {
  const [featuredBlog, ...otherBlogs] = blogs;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="animate-pulse text-5xl font-extrabold text-center mb-16 text-green-800 dark:text-green-200">
          Healthy Living Blog
        </h1>

        {/* Featured Blog Post */}
        <Card className="mb-16 overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800">
          <CardHeader className="p-0 h-96 relative">
            <Image
              src={featuredBlog.image}
              alt={featuredBlog.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <Badge className="bg-green-500 text-white dark:bg-green-700 text-lg px-3 py-1">
                Featured
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="flex justify-between items-center mb-4">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                {featuredBlog.category}
              </Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(featuredBlog.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <CardTitle className="text-3xl font-bold mb-4 text-green-700 dark:text-green-300">
              {featuredBlog.title}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {featuredBlog.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                By <span className="font-semibold">{featuredBlog.author}</span>
              </span>
              <Link
                href={`/blogpost/${featuredBlog.slug}`}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                Read More
              </Link>
            </div>
          </CardContent>
          <CardFooter className="p-6 bg-green-50 dark:bg-green-900">
            <CommentComponent slug={featuredBlog.slug} />
          </CardFooter>
        </Card>

        {/* Other Blog Posts */}
        <div className="space-y-8">
          {otherBlogs.map((blog, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-800"
            >
              <div className="md:flex">
                <CardHeader className="p-0 md:w-1/3 h-48 md:h-auto relative">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </CardHeader>
                <div className="md:w-2/3">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                        {blog.category}
                      </Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(blog.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold mb-2 text-green-700 dark:text-green-300">
                      {blog.title}
                    </CardTitle>
                    <ScrollArea className="h-24 mb-4">
                      <p className="text-gray-600 dark:text-gray-300">
                        {blog.description}
                      </p>
                    </ScrollArea>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        By <span className="font-semibold">{blog.author}</span>
                      </span>
                      <Link
                        href={`/blogpost/${blog.slug}`}
                        className="text-green-500 hover:text-green-600 font-semibold transition duration-300"
                      >
                        Read More →
                      </Link>
                    </div>
                  </CardContent>
                </div>
              </div>
              <CardFooter className="p-4 bg-green-50 dark:bg-green-900">
                <CommentComponent slug={blog.slug} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

