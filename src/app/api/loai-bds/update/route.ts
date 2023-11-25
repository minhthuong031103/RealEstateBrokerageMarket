import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();

  const loaiHinhBDS = await prisma.loaiHinh.update({
    where: {
        id: body?.id,
    },
    data: {
        ...body
    },
  });
  if (loaiHinhBDS) {
    return new Response(JSON.stringify(loaiHinhBDS), { status: 200 });
  }
}
