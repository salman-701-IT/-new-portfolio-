
'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'; // Using MessageCircle for WhatsApp, Add Phone, Remove Download
import SectionContainer from '../section-container';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

// Removed CV link placeholder
const mailtoLink = 'mailto:salmankhan701.it@email.com';
const whatsappLink = 'https://wa.me/919750129532'; // Updated WhatsApp link
const phoneLink = 'tel:+919750129532'; // Updated Phone link

export function ContactSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactInfo = [
    { icon: Mail, text: 'salmankhan701.it@email.com', href: mailtoLink, label: 'Email' },
    { icon: Phone, text: '+91-9750129532', href: phoneLink, label: 'Phone' }, // Added Phone
    { icon: MessageCircle, text: '+91-9750129532', href: whatsappLink, label: 'WhatsApp', target: '_blank' },
    { icon: MapPin, text: 'Chennai, India', label: 'Location' },
  ];

  return (
    <SectionContainer id="contact" className="py-16 md:py-24">
      <div ref={ref} className={cn('max-w-4xl mx-auto scroll-fade-in', inView && 'scroll-fade-in-visible')}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-glow-primary">Get In Touch</h2>
        <Card className="glassmorphism p-6 md:p-10 border-primary neon-glow-primary">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4 text-accent">Contact Information</h3>
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

            {/* Email Me Section */}
            <div className="flex flex-col items-center justify-center text-center space-y-6 p-6 bg-secondary/50 rounded-lg">
                 <h3 className="text-xl font-semibold text-foreground">Let's Discuss Your Project!</h3>
                <p className="text-muted-foreground text-sm">Interested in collaborating or have a question? Send me an email.</p>
                <Button size="lg" asChild className="group neon-glow hover:shadow-[0_0_25px_theme(colors.accent),0_0_40px_theme(colors.accent)] transition-shadow duration-300">
                    <a href={mailtoLink + '?subject=Project%20Inquiry'}>
                      <Mail className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-1" />
                      Send Email
                    </a>
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionContainer>
  );
}
