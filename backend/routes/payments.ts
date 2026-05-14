import { Router } from 'express';
import Stripe from 'stripe';

const router = Router();
let stripeClient: Stripe | null = null;

function getStripe() {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY environment variable is required. Please set it in the Settings menu.');
    }
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

router.post('/create-payment-intent', async (req, res) => {
  const { amount, currency = 'lkr' } = req.body;

  try {
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { integration_check: 'accept_a_payment' },
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error('Stripe Error:', error.message);
    res.status(500).send({ error: error.message });
  }
});

export default router;
