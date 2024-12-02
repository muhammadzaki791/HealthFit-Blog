import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import rehypeDocument from 'rehype-document';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import rehypePrettyCode from "rehype-pretty-code";
import { transformerCopyButton } from '@rehype-pretty/transformers';
import OnThisPage from "@/components/onthispage";
import CommentComponent from "@/components/Comment";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  try {
    const files = await fs.readdir(path.join(process.cwd(), 'content'));
    return files.map((filename) => ({
      slug: filename.replace('.md', ''),
    }));
  } catch (error) {
    console.error("Error reading content directory:", error);
    return [];
  }
}

export default async function PostPage({ params }: PageProps) {
  const filepath = path.join(process.cwd(), `content/${params.slug}.md`);

  try {
    const fileContent = await fs.readFile(filepath, "utf-8");
    const { content, data } = matter(fileContent);

    const processor = unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeDocument, { title: '👋🌍' })
      .use(rehypeFormat)
      .use(rehypeStringify)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings)
      .use(rehypePrettyCode, {
        theme: "github-dark",
        transformers: [
          transformerCopyButton({
            visibility: 'always',
            feedbackDuration: 3_000,
          }),
        ],
      });

    const htmlContent = (await processor.process(content)).toString();

    return (
      <div className=" overflow-hidden min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-2xl">
            <CardHeader className="relative h-64">
              <Image
                src={data.image || "/placeholder.jpg"}
                alt={data.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-6">
                <CardTitle className="text-4xl md:text-5xl font-bold text-white">
                  {data.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {data.categories && data.categories.map((category: string, index: number) => (
                  <Badge key={index} variant="secondary" className="animate-float">
                    {category}
                  </Badge>
                ))}
              </div>
              <p className="text-lg mb-4 text-gray-700 dark:text-gray-300 italic">
                &quot;{data.description}&quot;
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <div className="flex items-center">
                  <Image
                    src={"/default-avatar.jpg"}
                    alt={data.author}
                    width={40}
                    height={40}
                    className="rounded-full mr-2"
                  />
                  <span>{data.author}</span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span>{new Date(data.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <Separator className="my-6" />
              <div
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                className="prose dark:prose-invert max-w-none"
              ></div>
            </CardContent>
            <CardFooter className="p-6 bg-green-50 dark:bg-green-900 mt-auto">
              <div className="w-full flex flex-col justify-between items-center">
                <CommentComponent slug={params.slug} />
              </div>
            </CardFooter>
          </Card>
            <OnThisPage htmlContent={htmlContent} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error reading markdown file:", error);
    notFound();
  }
}

