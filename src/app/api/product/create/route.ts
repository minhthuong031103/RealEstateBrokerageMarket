import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  if (!body) return new Response('no body', { status: 400 });
  try {
    const create = await prisma.product.create({
      data: {
        name: body.name,
        price: body.price,
        description: body.description,
        images: body.images,
        thumbnail: body.thumbnail,
      },
    });
    if (create) {
      return new Response(
        JSON.stringify({
          message: 'Product created',
          status: 200,
        })
      );
    } else {
      return new Response(
        JSON.stringify({
          message: 'Product not created',
          status: 400,
        })
      );
    }
  } catch (e) {
    return new Response('error', { status: 500 });
  }
}
