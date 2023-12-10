import prisma from '@/lib/prisma';

export async function GET(request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = parseInt(searchParams.get('id'));

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      role: true,
      duyetDoiTac: true,
      duyetKhachHang: true,
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(user), { status: 200 });
}
