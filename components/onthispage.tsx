"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight } from 'lucide-react';

interface OnThisPageProps {
  htmlContent: string;
}

interface Heading {
  text: string | null;
  id: string;
}

const OnThisPage: React.FC<OnThisPageProps> = ({ htmlContent }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeHeading, setActiveHeading] = useState<string | null>(null);

  useEffect(() => {
    // Parse the HTML content and extract h2 headings
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const h2Elements = tempDiv.querySelectorAll('h2');
    const h2Data: Heading[] = Array.from(h2Elements).map(h2 => ({
      text: h2.textContent,
      id: h2.id
    }));
    setHeadings(h2Data);

    // Set up intersection observer for headings
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -66% 0px' }
    );

    h2Elements.forEach((h2) => observer.observe(h2));

    return () => observer.disconnect();
  }, [htmlContent]);

  return (
    <Card className="on-this-page justify-center lg:w-52 fixed right-4 top-24 lg:right-4 hidden lg:block shadow-lg animate-slide-in">
      <CardHeader>
        <CardTitle className="text-lg justify-center font-bold text-green-700 dark:text-green-300">On This Page</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea>
          <ul className='space-y-2'>
            {headings.map((heading, index) => (
              <li key={index} className={`transition-all duration-300 ease-in-out ${activeHeading === heading.id ? 'translate-x-2' : ''}`}>
                <a 
                  href={`#${heading.id}`}
                  className={`flex items-center text-sm hover:text-green-600 dark:hover:text-green-400 ${activeHeading === heading.id ? 'font-bold text-green-600 dark:text-green-400' : 'text-gray-600 dark:text-gray-300'}`}
                >
                  <ChevronRight className={`mr-2 h-4 w-4 transition-opacity duration-300 ${activeHeading === heading.id ? 'opacity-100' : 'opacity-0'}`} />
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default OnThisPage;

