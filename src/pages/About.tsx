import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, TikTok, Mail } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4 md:px-10 lg:px-20">
      <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About <span className="text-primary">Sendo Atelier</span></h1>
        <p className="text-gray-500 max-w-2xl mx-auto">We’re redefining fashion with creativity, quality, and technology. Sendo Atelier is more than a store — it’s an experience for modern style lovers.</p>
      </motion.section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <motion.div whileHover={{ scale: 1.02 }} className="transition-transform">
          <Card className="p-6 h-full border border-gray-200 shadow-sm hover:shadow-md"><CardContent>
            <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
            <p className="text-gray-500">To empower individuals through fashion that combines elegance, sustainability, and creativity. Every product we create tells a story of craftsmanship and care.</p>
          </CardContent></Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="transition-transform">
          <Card className="p-6 h-full border border-gray-200 shadow-sm hover:shadow-md"><CardContent>
            <h2 className="text-2xl font-semibold mb-3">What We Do</h2>
            <p className="text-gray-500">Sendo Atelier blends timeless design with cutting-edge trends to deliver collections that resonate with your personality. From streetwear to couture, we’re all about self-expression.</p>
          </CardContent></Card>
        </motion.div>
      </section>

      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
        <p className="text-gray-500 mb-8">Have a question, collaboration, or press inquiry? Send us a message — we’d love to hear from you.</p>

        <Card className="p-6">
          <form onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }} className="space-y-5">
            <div><Label htmlFor="name">Full Name</Label><Input id="name" placeholder="Jane Doe" required /></div>
            <div><Label htmlFor="email">Email Address</Label><Input id="email" type="email" placeholder="you@example.com" required /></div>
            <div><Label htmlFor="message">Message</Label><Textarea id="message" placeholder="Type your message..." required /></div>
            <Button type="submit" className="w-full py-3 text-base rounded-full">Send Message</Button>
          </form>
        </Card>

        <div className="flex justify-center gap-6 mt-10 text-gray-600">
          <motion.a whileHover={{ scale: 1.2 }} href="https://www.facebook.com/sandra.igyosugh/" target="_blank"><Facebook className="w-6 h-6" /></motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="https://www.instagram.com/sendo_atelier/" target="_blank"><Instagram className="w-6 h-6" /></motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="https://www.tiktok.com/@sendoatelier" target="_blank"><TikTok className="w-6 h-6" /></motion.a>
          <motion.a whileHover={{ scale: 1.2 }} href="mailto:sendoatelier@gmail.com"><Mail className="w-6 h-6" /></motion.a>
        </div>
      </motion.section>
    </div>
  );
}
