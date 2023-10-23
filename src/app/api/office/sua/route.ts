import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();

  const office = await prisma.office.update({
    where: {
        id: body?.id,
    },
    data: {
        ...body
    },
  });
  if (office) {
    return new Response(JSON.stringify(office), { status: 200 });
  }
}
