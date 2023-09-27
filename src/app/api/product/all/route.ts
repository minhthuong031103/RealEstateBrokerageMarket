import prisma from '@/lib/prisma';
import { parseJSON } from '@/lib/utils';

export async function GET() {
  const allProducts = await prisma.product.findMany({});

  return new Response(JSON.stringify(allProducts), { status: 200 });
}
