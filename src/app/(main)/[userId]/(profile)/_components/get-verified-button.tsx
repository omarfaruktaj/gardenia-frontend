'use client';

import { Stripe, loadStripe } from '@stripe/stripe-js';
import { BadgeCheck } from 'lucide-react';
import { toast } from 'sonner';

import { badgeVariants } from '@/components/ui/badge';
import envConfig from '@/config/env-config';
import { cn } from '@/lib/utils';
import { getPaymentSession } from '@/services/payment-service';

const stripePromise = loadStripe(
  envConfig.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export default function GetVerifiedButton() {
  const handlePayment = async () => {
    const stripe: Stripe | null = await stripePromise;

    if (!stripe) {
      // console.error('Stripe.js failed to load.');
      toast.error('Unable to load payment processor. Please try again later.');
      return;
    }

    try {
      const response = await getPaymentSession();
      const { id } = response;

      const { error } = await stripe.redirectToCheckout({ sessionId: id });

      if (error) {
        // console.error('Error redirecting to checkout:', error);
        toast.error('Failed to redirect to checkout. Please try again.');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error('Error initiating payment:', error);
      toast.error('Payment initiation failed. Please try again.');
    }
  };

  return (
    <div
      className={cn(
        badgeVariants({ variant: 'outline' }),
        'rounded-full text-primary mt-2 cursor-pointer'
      )}
      onClick={handlePayment}
    >
      <BadgeCheck className="h-4 w-4 text-primary mr-2 " /> Get verified
    </div>
  );
}
