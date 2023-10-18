import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = parseInt(searchParams?.get('id')); // Retrieves the value of the 'skip' parameter
  
  const user = await prisma.user.findMany({
    where: {
        id: {
            equals: id
        }
    }
  });
  return new Response(JSON.stringify(user), { status: 200 });
}
