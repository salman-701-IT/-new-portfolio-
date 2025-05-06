
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Added CardHeader, CardTitle
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'; // Added Send icon
import SectionContainer from '../section-container';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label'; // Import Label
import { Textarea } from '@/components/ui/textarea'; // Import Textarea

// Removed CV link placeholder
const mailtoLink = 'mailto:salmankhan701.it@gmail.com'; // Updated email
const whatsappLink = 'https://wa.me/919750129532'; // Updated WhatsApp link
const phoneLink = 'tel:+919750129532'; // Updated Phone link

export function ContactSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactInfo = [
    { icon: Mail, text: 'salmankhan701.it@gmail.com', href: mailtoLink, label: 'Email Address' }, // Updated email, More descriptive label
    { icon: Phone, text: '+91-9750129532', href: phoneLink, label: 'Phone Number' }, // More descriptive label
    { icon: MessageCircle, text: '+91-9750129532', href: whatsappLink, label: 'WhatsApp', target: '_blank' },
    { icon: MapPin, text: 'Chennai, India', label: 'Location' },
  ];

  // Basic handler to construct mailto link with subject and body (for demonstration)
  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = formData.get('message') as string;
    const subject = 'Project Inquiry: Let\'s Collaborate';
    const body = encodeURIComponent(message || 'I\'d like to discuss a project!');
    window.location.href = `${mailtoLink}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };


  return (
    <SectionContainer id="contact" className="py-16 md:py-24">
      <div ref={ref} className={cn('max-w-4xl mx-auto scroll-fade-in', inView && 'scroll-fade-in-visible')}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-primary">Get in Touch</h2> {/* Changed title */}
        <Card className="glassmorphism p-6 md:p-10 border-primary neon-glow-primary">
           <CardHeader className="p-0 mb-6"> {/* Added CardHeader */}
               <CardTitle className="text-2xl font-semibold text-center text-accent">Contact Details</CardTitle>
           </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start"> {/* Changed to items-start */}
            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="p-3 bg-secondary rounded-full group-hover:bg-accent transition-colors">
                     <item.icon className="w-5 h-5 text-primary group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.target || '_self'}
                        rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                        className="text-foreground font-medium hover:text-accent transition-colors break-all"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{item.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Form Section */}
             <form onSubmit={handleSendMessage} className="flex flex-col space-y-6">
                 <div>
                     <Label htmlFor="message" className="text-foreground/90 mb-2 block">Your Message</Label>
                     <Textarea
                        id="message"
                        name="message" // Added name attribute for form handling
                        placeholder="Hi Salman, I'd like to discuss..."
                        rows={5} // Adjust rows as needed
                        className="bg-secondary/50 border-border focus:border-primary focus:ring-primary"
                        required
                    />
                 </div>
                <Button type="submit" size="lg" className="group neon-glow hover:shadow-[0_0_25px_theme(colors.accent),0_0_40px_theme(colors.accent)] transition-shadow duration-300 w-full">
                  <Send className="mr-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  Send Message via Email
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                    (Opens your default email client)
                </p>
            </form>

          </CardContent>
        </Card>
      </div>
    </SectionContainer>
  );
}
