import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import type Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();

  const signature = (headers().get('Stripe-Signature') as string) ?? '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature.toString(),
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    console.log(err?.message);
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`,
      { status: 400 }
    );
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (!session?.metadata?.userId) {
    return new Response(null, {
      status: 200,
    });
  }
  console.log(event.type);

  //this is new subscription
  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    const product = await stripe.products.retrieve(
      session.metadata.productId as string
    );
    console.log('product in webhook', product);

    console.log('metadataaaaaaaaaaaaaaaaaaaaaaaaa');
    console.log(session.metadata.userId);
    console.log(session);

    const user = await prisma.user.findUnique({
      where: { id: parseInt(session.metadata.userId) },
    });
    if (!user) return new Response(null, { status: 200 });
    await prisma.user.update({
      where: {
        id: parseInt(session.metadata.userId),
      },
      data: {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),

        ...(product?.metadata?.luot && {
          luot: user.luot + parseInt(product?.metadata?.luot),
        }),
        ...(product?.metadata?.luotChuyenNghiep && {
          luotChuyenNghiep:
            user.luotChuyenNghiep +
            parseInt(product?.metadata?.luotChuyenNghiep),
        }),
        ...(product?.metadata?.luotVip && {
          luotVip: user.luotVip + parseInt(product?.metadata?.luotVip),
        }),

        giamGia: product?.metadata?.giamGia
          ? parseInt(product?.metadata?.giamGia)
          : 0,
      },
    });
  }

  //this is renew subscription
  if (event.type === 'invoice.payment_succeeded') {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );
    console.log('metadataaaaaaaaaaaaaaaaaaaaaaaaa');
    console.log(session.metadata.userId);
    console.log(session);
    await prisma.user.update({
      where: {
        stripeSubscriptionId: subscription.id,
      },
      data: {
        stripePriceId: subscription.items.data[0]?.price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  }

  return new Response(JSON.stringify('ok'), { status: 200 });
}
