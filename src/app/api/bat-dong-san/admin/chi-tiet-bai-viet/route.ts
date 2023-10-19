import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = parseInt(searchParams?.get('id')); // Retrieves the value of the 'skip' parameter

  const bds = await prisma.baiViet.findMany({
    include: {
      loaiHinh: {
        include: {
          loaiBDS: true,
        },
      },
      user: true,
    },
    where: {
        id: {
            equals: id,
        }
    },
  })
  return new Response(JSON.stringify(bds), { status: 200 });
}
