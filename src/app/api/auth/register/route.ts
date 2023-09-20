import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  if (!body) return new Response('no body', { status: 400 });
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (user)
      return new Response(
        JSON.stringify({
          message: 'User already exists',
          status: 400,
        })
      );

    const create = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
      },
    });
    if (create) {
      return new Response(
        JSON.stringify({
          message: 'User created',
          status: 200,
        })
      );
    }
  } catch (e) {
    console.log(e);
    return new Response('error', { status: 500 });
  }

  return new Response('hello world');
}
