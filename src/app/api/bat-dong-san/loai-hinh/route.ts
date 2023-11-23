import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();

  const danhMuc = await prisma.loaiBDS.findUnique({
    where: {
      name: body.name,
    },
  });

  const loaiHinh = await prisma.loaiHinh.findMany({
    where: {
      loaiBDSId: danhMuc?.id,
      visible: true
    },
  });

  return new Response(JSON.stringify(loaiHinh), { status: 200 });
}
