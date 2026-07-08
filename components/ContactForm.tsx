"use client";

import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Check, Send, Loader } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Validation schema
// Validation schema with proper email checks
const contactSchema = z.object({
  name: z.string().nonempty("Full Name is required"),
  email: z
    .string()
    .nonempty("Email is required") 
    .email("Invalid email"),               
  message: z
    .string()
    .nonempty("Message is required")
    .min(5, "Message must be at least 5 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // new loading state

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true); // start loader
    try {
      await emailjs.send(
        "service_i8qtyr5",
        "template_vbhk41f",
        {
          name: data.name,
          email: data.email,
          message: data.message,
        },
        "ic179xuArXViTzCUM"
      );

      setSuccess(true);
      form.reset();

      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error("Email failed:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <div className="relative w-full min-w-0">

      {/* PREMIUM SUCCESS POPUP */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div
            className="relative z-10 flex flex-col items-center gap-4
              p-8 rounded-2xl shadow-[0_15px_40px_rgba(231,94,80,0.35)]
              bg-gradient-to-br from-[#e75e50]/90 to-[#e75e50]/70
              animate-in fade-in scale-in duration-500 transform
              ring-2 ring-[#e75e50]/50"
          >
            <div
              className="flex items-center justify-center w-20 h-20 rounded-full
                bg-white text-[#e75e50] shadow-lg
                ring-4 ring-[#e75e50]/30 animate-bounce"
            >
              <Check className="w-10 h-10" />
            </div>
            <p className="text-center text-lg font-semibold text-white">
              Thank you for contacting me! <br /> I will respond soon.
            </p>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full min-w-0 space-y-6">

          {/* COMPANY NAME FIELD */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark">Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your company or full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* EMAIL FIELD */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your.email@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* MESSAGE FIELD */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here..."
                    rows={6}
                    {...field}
                    className="contact-message-textarea"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            <span className="flex items-center gap-2">
              {loading ? (
                <Loader className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {loading ? "Sending..." : "Send Message"}
            </span>
          </Button>

        </form>
      </Form>
    </div>
  );
}