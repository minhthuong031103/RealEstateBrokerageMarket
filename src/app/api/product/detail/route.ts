import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  console.log(request.url);
  console.log(new URL(request.url));
  const { searchParams } = new URL(request.url);
  console.log('searchParams', searchParams);
  const productId = searchParams.get('productId');
  const productDetail = await prisma.product.findUnique({
    where: {
      id: parseInt(productId ?? '0'),
    },
  });
  if (!productDetail) return new Response(JSON.stringify({}), { status: 404 });
  return new Response(JSON.stringify(productDetail), { status: 200 });
}
