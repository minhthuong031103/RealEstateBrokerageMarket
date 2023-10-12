import prisma from '@/lib/prisma';

export async function GET() {
  const allProducts = await prisma.baiViet.findMany({});

  return new Response(JSON.stringify(allProducts), { status: 200 });
}
