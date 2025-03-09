'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export default function Contact() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  function onSubmit() {
    toast.success('Thank you for your message!');
    form.reset();
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
      <Separator />

      <div className="max-w-5xl mx-auto grid grid-cols-1  gap-10">
        <div className=" pt-2 mb-8 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your Message"
                          {...field}
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                <Button size="lg" className="w-full mt-4" type="submit">
                  Send Message
                </Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="flex items-center justify-center ">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <p className="text-muted-foreground mb-6">
              We&apos;re here to help and answer any question you might have. We
              look forward to hearing from you.
            </p>
            <ul className="list-none space-y-4">
              <li className="flex items-center">
                <Phone className="text-primary mr-2" />
                <span>Phone: +88017844548558</span>
              </li>
              <li className="flex items-center">
                <Mail className="text-primary mr-2" />
                <span>Email: support@meetspace.com</span>
              </li>
              <li className="flex items-center">
                <MapPin className="text-primary mr-2" />
                <span>Address: 123 Keyboard St, Dhaka City, TX 12345</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
