'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  CheckCircle,
  Clock,
  Globe,
  HeartHandshake,
  Leaf,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Shield,
  Star,
  Users,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

export default function Contact() {
  const [isPending, startTransition] = useTransition();
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(data: FormData) {
    startTransition(async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(
        "Thank you for your message! We'll get back to you within 24 hours."
      );
      console.log('Form submitted:', data);
      form.reset();
      setSelectedTopic('');
    });
  }

  const contactTopics = [
    { id: 'general', label: 'General Inquiry', icon: MessageSquare },
    { id: 'support', label: 'Technical Support', icon: Shield },
    { id: 'partnership', label: 'Partnership', icon: HeartHandshake },
    { id: 'feedback', label: 'Feedback', icon: Star },
  ];

  const faqs = [
    {
      question: 'How quickly do you respond to messages?',
      answer:
        'We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line.',
    },
    {
      question: 'Can I schedule a call with your team?',
      answer:
        "Mention your preferred time in your message, and we'll coordinate a call that works for both of us.",
    },
    {
      question: 'Do you offer technical support?',
      answer:
        'Yes, we provide comprehensive technical support for all our services. Our expert team is ready to help with any technical questions.',
    },
    {
      question: 'How can I become a partner?',
      answer:
        "We're always looking for great partners! Send us a message with 'Partnership' as the subject, and tell us about your organization.",
    },
  ];

  return (
    <div className="min-h-screen ">
      <div className="relative ">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-30" />
                <div className="relative  w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-green-800 mb-6">
              Get in
              <span className="block text-green-600">Touch</span>
            </h1>
            <p className="text-lg text-green-700/80 mb-8">
              Have questions about our gardening community? Need support? Want
              to partner with us? We&apos;d love to hear from you and help you
              grow your gardening journey.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-green-600">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>24h Response</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Expert Team</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Global Support</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div>
              <Card className="shadow-2xl border-0 ">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl text-green-800 flex items-center space-x-2">
                    <Send className="h-6 w-6" />
                    <span>Send us a Message</span>
                  </CardTitle>
                  <p className="text-green-600">
                    Fill out the form below and we&apos;ll get back to you as
                    soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  {/* Topic Selection */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-green-800 mb-3 block">
                      What can we help you with?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {contactTopics.map((topic) => {
                        const Icon = topic.icon;
                        return (
                          <button
                            key={topic.id}
                            type="button"
                            onClick={() => {
                              setSelectedTopic(topic.id);
                              form.setValue('subject', topic.label);
                            }}
                            className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-2 text-sm ${
                              selectedTopic === topic.id
                                ? 'border-green-400 bg-green-50 text-green-700'
                                : 'border-green-200 hover:border-green-300 hover:bg-green-50/50 text-green-600'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{topic.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-green-800 font-medium">
                                Full Name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your full name"
                                  className="border-green-200 focus:border-green-400 focus:ring-green-400"
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-green-800 font-medium">
                                Email Address
                              </FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  placeholder="Enter your email"
                                  className="border-green-200 focus:border-green-400 focus:ring-green-400"
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-green-800 font-medium">
                              Subject
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="What's this about?"
                                className="border-green-200 focus:border-green-400 focus:ring-green-400"
                                disabled={isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-green-800 font-medium">
                              Message
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                {...field}
                                placeholder="Tell us more about how we can help you..."
                                rows={5}
                                className="border-green-200 focus:border-green-400 focus:ring-green-400 resize-none"
                                disabled={isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 transition-all duration-200"
                      >
                        {isPending ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Send className="h-4 w-4" />
                            <span>Send Message</span>
                          </div>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information & Additional Content */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card className="shadow-xl border-0 ">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-800 flex items-center space-x-2">
                    <Phone className="h-6 w-6" />
                    <span>Contact Information</span>
                  </CardTitle>
                  <p className="text-green-600">
                    Reach out to us through any of these channels. We&apos;re
                    here to help!
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-green-50 border border-green-100">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800">
                          Phone Support
                        </h4>
                        <p className="text-green-600 text-sm mb-1">
                          +88017844548558
                        </p>
                        <p className="text-green-500 text-xs">
                          Mon-Fri, 9AM-6PM (GMT+6)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-blue-50 border border-blue-100">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800">
                          Email Support
                        </h4>
                        <p className="text-green-600 text-sm mb-1">
                          support@gardeningcommunity.com
                        </p>
                        <p className="text-green-500 text-xs">
                          We respond within 24 hours
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-4 rounded-lg bg-purple-50 border border-purple-100">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-green-800">
                          Office Address
                        </h4>
                        <p className="text-green-600 text-sm mb-1">
                          123 Garden Street, Green City
                        </p>
                        <p className="text-green-500 text-xs">
                          Dhaka, Bangladesh 12345
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Response Time Badge */}
                  <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-lg p-4 text-white">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="h-5 w-5" />
                      <span className="font-semibold">
                        Quick Response Guarantee
                      </span>
                    </div>
                    <p className="text-green-100 text-sm">
                      We pride ourselves on quick responses. Most inquiries are
                      answered within 2-4 hours during business hours.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Why Contact Us */}
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-green-800 flex items-center space-x-2">
                    <Leaf className="h-5 w-5" />
                    <span>Why Reach Out?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800">
                          Expert Gardening Advice
                        </h4>
                        <p className="text-sm text-green-600">
                          Get personalized tips from our master gardeners
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800">
                          Technical Support
                        </h4>
                        <p className="text-sm text-green-600">
                          Resolve any platform issues quickly
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800">
                          Community Partnerships
                        </h4>
                        <p className="text-sm text-green-600">
                          Explore collaboration opportunities
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-800">
                          Feature Requests
                        </h4>
                        <p className="text-sm text-green-600">
                          Help us improve the platform
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-green-600">
                Quick answers to common questions. Can&apos;t find what
                you&apos;re looking for? Send us a message!
              </p>
            </div>

            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-green-800 hover:text-green-600">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-green-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-2xl font-bold text-green-800">24h</div>
                <div className="text-sm text-green-600">Response Time</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-800">10K+</div>
                <div className="text-sm text-green-600">Happy Members</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-800">99%</div>
                <div className="text-sm text-green-600">Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-800">24/7</div>
                <div className="text-sm text-green-600">Community Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
