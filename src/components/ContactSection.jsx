import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react"
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast"
import { useState, useRef } from "react";
import { Globe } from "./Globe";

export const ContactSection = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef();

    const isValidEmail = (email) => {
        if (!email) return false;
        // Simple RFC-like check (keeps user experience reasonable) [basically checking Regex]
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formRef.current) return;

        const form = formRef.current;

        // Sanitize inputs
        const name = (form.from_name?.value || "").trim();
        const email = (form.user_email?.value || "").trim();
        const message = (form.message?.value || "").trim();
        const honeypot = (form.company?.value || "").trim();       // hidden field

        // Honeypot: If filled, likely a bot
        if (honeypot) {
            console.warn("Honeypot triggered - Blocking submission");
            toast({
                title: "Spam detected",
                description: "Your response seems automated & was blocked",
                variant: "destructive",
                duration: 4000,
            });
            return;
        }

        // Validations
        if (!name || name.length < 2) {
            toast({ title: "Please enter your name", duration: 2000 });
            return;
        }
        if (!isValidEmail(email)) {
            toast({ title: "Please provide a valid email address", duration: 2000 });
            return;
        }
        if (!message || message.length < 10) {
            toast({ title: "Please write a slightly longer message", duration: 2000 });
            return;
        }
        if (message.length > 5000) {
            toast({ 
                title: "Message is too long",
                description: "Please keep the message under 5000 characters.",
                duration: 2000 
            });
            return;
        }

        setIsSubmitting(true);

        // EMAIL JS Settings
        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                form,
                { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
            )
            toast({
                title: "✅ Message Sent!",
                description: "Thank you for your message. I'll get back to you soon.",
                duration: 4000,
            });
            // Reset form & return focus to first input field
            form.reset();
            const firstInput = form.querySelector('input[name="from_name"]');
            if (firstInput) firstInput.focus();

        } catch (error) {
            console.error("EmailJS Error: ", error);
            toast({
                title: "❌ Failed to Send",
                description: "Something went wrong, Please try again later",
                variant: "destructive",
                duration: 5000,
            });
        } finally {
            setIsSubmitting(false);
        }
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
                    <h3 className="text-2xl font-semibold mb-6">Contact Info</h3>
                    <div className="space-y-6 flex flex-col">
                        {/* 4 Links */}
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Mail className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <h4 className="font-medium">
                                    <a href="mailto:karthikeyan616a@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                                        Email
                                    </a>
                                </h4>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Linkedin className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <h4 className="font-medium">
                                    <a 
                                        href="" target="_blank" rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        LinkedIn
                                    </a>
                                </h4>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Github className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <h4 className="font-medium">
                                    <a 
                                        href="https://www.github.com/karthi1048" target="_blank" rel="noopener noreferrer"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Github
                                    </a>
                                </h4>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <MapPin className="h-6 w-6 text-primary"/>
                            </div>
                            <div>
                                <h4 className="font-medium">Location - India</h4>
                            </div>
                        </div>
                    </div>
                    {/* Globe component */}
                    <div aria-hidden="true" tabIndex={-1} className="pointer-events-none">
                        <Globe />
                    </div>
                </div>

                {/* Right side */}
                <div className="bg-card p-8 rounded-lg shadow-xs" >
                    <h3 className="text-2xl text-center font-semibold mb-6">Send a Message</h3>
                    <form
                        noValidate
                        ref={formRef} 
                        onSubmit={ handleSubmit } 
                        className="w-full max-w-lg flex flex-col gap-10"
                    >   
                        {/* Honeypot (hidden) */}
                        <div 
                            aria-hidden="true"
                            style={{position: "absolute", left: "-9999px", top: "auto", width: "1px", height: "1px", overflow: "hidden"}}
                        >
                            <label htmlFor="company">Company</label>
                            <input id="company" name="company" tabIndex={-1} autoComplete="off" />
                        </div>
                        <div className="relative">
                            <label htmlFor="from_name" className="absolute -top-3 left-3 px-2 text-sm z-10">
                                Your Name
                            </label>
                            <input 
                                required type="text" id="from_name" name="from_name" placeholder="John" autoComplete="name"
                                aria-required="true" aria-label="Your Name" minLength={2} maxLength={100}
                                className="w-full p-4 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 relative z-0"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="user_email" className="absolute -top-3 left-3 px-2 text-sm z-10">
                                Your Email
                            </label>
                            <input 
                                required type="email" id="user_email" name="user_email" placeholder="abc@gmail.com" autoComplete="email"
                                aria-required="true" aria-label="Your Email" maxLength={254}
                                className="w-full p-4 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 relative z-0"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="message" className="absolute -top-3 left-3 px-2 text-sm z-10">
                                Your Message
                            </label>
                            <textarea 
                                required id="message" name="message" placeholder="Hello, I'd like to talk about..." rows="5"
                                aria-required="true" aria-label="Your message" minLength={10} maxLength={5000}
                                className="w-full p-4 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 relative z-0 resize-none">
                            </textarea>
                        </div>
                        <button 
                            type="submit" disabled={ isSubmitting } aria-busy= { isSubmitting }
                            className="cosmic-button w-full flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                            <Send size={16}/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}