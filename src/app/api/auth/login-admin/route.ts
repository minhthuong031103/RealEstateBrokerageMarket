import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  console.log('🚀 ~ file: route.ts:3 ~ POST ~ body:', body);
  const admin = await prisma.office.findFirst({
    where: {
      email: body.email,
    },
  });
  console.log('🚀 ~ file: route.ts:11 ~ POST ~ admin:', admin);

  if (!admin) {
    return new Response(
      JSON.stringify({
        message: 'User not found',
        status: 400,
      })
    );
  }
  if (admin.password !== body.password) {
    return new Response(
      JSON.stringify({
        message: 'Password incorrect',
        status: 400,
      })
    );
  }
  return new Response(
    JSON.stringify({
      message: 'Login success',
      status: 200,
    })
  );
}
