import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  console.log('request', request);
  const featured = await prisma.product.findMany({
    take: 10,
  });
  if (featured) return new Response(JSON.stringify(featured), { status: 200 });
}
