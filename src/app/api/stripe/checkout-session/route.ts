import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { getUserSubscriptionPlan, stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return { status: 401, body: { message: 'Unauthorized' } };
  const user = await prisma.user.findUnique({
    where: { id: session?.user.id },
  });
  const billing_url = `${process.env.NEXT_PUBLIC_SITE_URL}/agency/goi-dich-vu`;
  if (!user) return { status: 401, body: { message: 'Unauthorized' } };

  const body = await request.json();
  if (!body?.product?.id)
    return { status: 400, body: { message: 'Bad Request' } };
  const subscriptionPlan = await getUserSubscriptionPlan();

  //handle if the user already has a subscription
  //it will be renew, and call invoice.payment_succeeded webhook
  if (subscriptionPlan && user.stripeCustomerId) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: billing_url,
    });

    return new Response(JSON.stringify({ url: stripeSession.url }), {
      status: 200,
    });
  }
  console.log('body in checkout-session', body);

  //handle if the user doesn't have a subscription
  //it will be create a new subscription, and call checkout.session.completed webhook
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billing_url,
    cancel_url: billing_url,
    payment_method_types: ['card'],
    mode: 'subscription',
    billing_address_collection: 'auto',
    line_items: [{ price: body?.product?.id, quantity: 1 }],
    metadata: {
      userId: user.id,
      productId: body?.product?.product,
    },
    customer_email: user.email,
  });

  return new Response(JSON.stringify({ url: stripeSession.url }), {
    status: 200,
  });
}
