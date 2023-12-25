import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;
  const userId = searchParams.get('userId');
  console.log('🚀 ~ file: route.ts:3 ~ GET ~ searchParams:', userId);
  if (!userId) return new Response('userId is required', { status: 400 });
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
    select: {
      duyetDoiTac: true,
      duyetKhachHang: true,
    },
  });
  if (!user) return new Response('user not found', { status: 404 });

  return new Response(JSON.stringify(user), { status: 200 });
}
