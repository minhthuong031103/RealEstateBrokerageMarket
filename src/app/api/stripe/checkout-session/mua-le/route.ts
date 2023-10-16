import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return new Response('Unauthorized', { status: 401 });
    const user = await prisma.user.findUnique({
      where: { id: session?.user.id },
    });
    // const billing_url = `${process.env.NEXT_PUBLIC_SITE_URL}/agency/goi-dich-vu`;
    const body = await request.json();
    console.log('🚀 ~ file: route.ts:14 ~ POST ~ body:', body);
    console.log('🚀 ~ file: route.ts:16 ~ POST ~ user:', user);

    if (!user || !user.stripeCustomerId || user.giamGia != body.giamGia)
      return new Response('Unauthorized', { status: 401 });
    try {
      const stripeSession = await stripe.paymentIntents.create({
        amount: body.amount,
        currency: 'vnd',
        payment_method_types: ['card'],
        metadata: {
          userId: user.id,
          type: body.type,
          amount: body.amount,
          giamGia: body.giamGia,
          luot: body?.luot,
          luotChuyenNghiep: body?.luotChuyenNghiep,
          luotVip: body?.luotVip,
        },
      });
      console.log(
        '🚀 ~ file: route.ts:32 ~ POST ~ stripeSession:',
        stripeSession
      );
      return new Response(
        JSON.stringify({ clientSecret: stripeSession.client_secret }),
        {
          status: 200,
        }
      );
    } catch (e) {
      console.log(e);
      return new Response('Unauthorized', { status: 401 });
    }
  } catch (e) {
    console.log(e);
  }
}
