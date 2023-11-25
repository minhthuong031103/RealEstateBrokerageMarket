import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = parseInt(searchParams?.get('id')); 
  
  const data = await prisma.loaiHinh.findMany({
    where: {
        loaiBDSId: id
    }
  });

  return new Response(JSON.stringify(data), { status: 200 });
}
