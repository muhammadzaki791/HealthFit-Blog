"use client";

import { useState, useRef } from "react";
import emailjs from "emailjs-com";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const EMAIL_JS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICE_ID;
    const EMAIL_JS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID;
    const EMAIL_JS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY;

    if (!EMAIL_JS_SERVICE_ID || !EMAIL_JS_TEMPLATE_ID || !EMAIL_JS_PUBLIC_KEY) {
      toast({
        title: "Configuration Error",
        description:
          "EmailJS keys are missing. Please configure them properly.",
      });
      setIsLoading(false);
      return;
    }

    const formData = new FormData(event.currentTarget);

    try {
      const response = await emailjs.send(
        EMAIL_JS_SERVICE_ID,
        EMAIL_JS_TEMPLATE_ID,
        {
          name: formData.get("name") || "",
          email: formData.get("email") || "",
          message: formData.get("message") || "",
        },
        EMAIL_JS_PUBLIC_KEY
      );

      if (response.status === 200) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you as soon as possible.",
        });
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        throw new Error("Failed to send the message.");
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Failed to Send",
        description: "An error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl text-center mb-8">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg text-gray-500 dark:text-gray-300 text-center mb-12">
          Have questions about your fitness journey? We are here to help!
        </p>
        <motion.form
          ref={formRef}
          onSubmit={onSubmit}
          className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                required
                className="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Message
            </label>
            <div className="mt-1">
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="py-3 px-4 block w-full shadow-sm focus:ring-green-500 focus:border-green-500 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              ></textarea>
            </div>
          </div>
          <div className="sm:col-span-2">
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : null}
              {isLoading ? "Sending..." : "Send Message"}
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
}
