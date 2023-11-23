import prisma from '@/lib/prisma';

export async function GET() {
  
  const loaiBDS = await prisma.loaiBDS.findMany({
    
  });

  return new Response(JSON.stringify(loaiBDS), { status: 200 });
}
