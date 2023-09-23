import prisma from '@/lib/prisma';

export async function GET() {
  const allUser = await prisma.user.findMany({
    where: {
      id: 1,
    },
    select: {
      name: true,
      email: true,
      id: true,
    },
  });
  if (!allUser) return new Response('No user found', { status: 404 });
  return new Response(JSON.stringify(allUser), { status: 200 });
}
