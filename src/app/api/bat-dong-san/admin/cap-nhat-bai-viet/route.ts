import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();

  const baiViet = await prisma.baiViet.update({
    where: {
        id: body?.id,
    },
    data: {
        trangThai: body?.trangThai,
    },
  });
  if (baiViet) {
    return new Response(JSON.stringify(baiViet), { status: 200 });
  }
}
