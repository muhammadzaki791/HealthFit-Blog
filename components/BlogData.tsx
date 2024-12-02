import fs from "fs";
import matter from 'gray-matter';

export interface BlogData {
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  slug: string;
}

export function getBlogData(): BlogData[] {
  const dirContent = fs.readdirSync("content", "utf-8");

  const blogs: BlogData[] = dirContent.map(file => {
    const fileContent = fs.readFileSync(`content/${file}`, "utf-8");
    const { data } = matter(fileContent);
    return data as BlogData;
  });

  return blogs;
}

