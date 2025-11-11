import { Instagram, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react"
import { classNs } from "../lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react";
import { Globe } from "./Globe";

export const ContactSection = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            toast({
                title: "Message Sent!",
                description: "Thank you for your message. I'll get back to you soon."
            });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Get In <span className="text-primary"> Touch</span>
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Have a project in mind or want to collaborate? Feel free to reach out.
                I'm always open to discussing new opportunities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Left Side */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                    <div className="space-y-6 flex flex-col">
                        {/* Mail */}
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Mail className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <h4 className="font-medium">
                                    <a href="mailto:karthikeyan616a@gmail.com" 
                                        className="text-muted-foreground hover:text-primary transition-colors">
                                        Email
                                    </a>
                                </h4>
                            </div>
                        </div>
                        {/* Linkedin */}
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Linkedin className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <h4 className="font-medium">
                                    <a href="" target="_blank" rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary transition-colors">
                                        LinkedIn
                                    </a>
                                </h4>
                            </div>
                        </div>
                        {/* Instagram */}
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Instagram className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <h4 className="font-medium">
                                    <a href="" target="_blank" rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary transition-colors">
                                        Instagram
                                    </a>
                                </h4>
                            </div>
                        </div>
                        {/* Phone */}
                        {/* <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Phone className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <h4 className="font-medium">Phone</h4>
                                <a href="tel:+916374645612" 
                                    className="text-muted-foreground hover:text-primary transition-colors">
                                    +91 00000 00000
                                </a>
                            </div>
                        </div> */}
                        {/* Location */}
                        {/* <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <MapPin className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <h4 className="font-medium">Location: India</h4>
                            </div>
                        </div> */}
                    </div>
                    {/* Globe component */}
                    <Globe />
                </div>

                {/* Right side */}
                <div className="bg-card p-8 rounded-lg shadow-xs" >
                    <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
                    <form action="" onSubmit={ handleSubmit } className="w-full max-w-lg flex flex-col gap-10">
                        <div className="relative">
                            {/* Need to add "autocomplete" attribute for the 2 inputs */}
                            <label 
                                htmlFor="name" 
                                className="absolute -top-3 left-3 px-2 text-sm z-10">
                                Your Name
                            </label>
                            {/* <span className="absolute -top-3 left-3 bg-cyan-100 right-auto h-3 w-16 z-[5] pointer-events-none">a</span> */}
                            <input 
                                required type="text" id="name" name="name" placeholder="John"
                                className="w-full p-4 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 relative z-0"/>
                        </div>
                        <div className="relative">
                            <label 
                                htmlFor="email" 
                                className="absolute -top-3 left-3 px-2 text-sm z-10">
                                Your Email
                            </label>
                            <input 
                                required type="email" id="email" name="email" placeholder="abc@gmail.com"
                                className="w-full p-4 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 relative z-0"/>
                        </div>
                        <div className="relative">
                            <label 
                                htmlFor="message" 
                                className="absolute -top-3 left-3 px-2 text-sm z-10">
                                Your Message
                            </label>
                            <textarea 
                                required id="message" name="message" placeholder="Hello, I'd like to talk about..." rows="5"
                                className="w-full p-4 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 relative z-0 resize-none">
                            </textarea>
                        </div>
                        <button type="submit" disabled={ isSubmitting }
                            className={classNs(
                            "cosmic-button w-full flex items-center justify-center gap-2",
                        )}>
                            {isSubmitting ? "Sending..." : "Send Message"}
                            <Send size={16}/>
                        </button>
                    </form>
                    {/* If someone submits this actual Message and receive an email from it, need to use Email API: Email Js */}
                </div>
            </div>
        </div>
    )
}