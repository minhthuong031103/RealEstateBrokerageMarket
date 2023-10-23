import prisma from '@/lib/prisma';

export async function GET() {

  const office = await prisma.office.findFirst({});
  // console.log(bds[0].sanPham.chiTietCanHo)
  // console.log(bds)
  return new Response(JSON.stringify(office), { status: 200 });
}
