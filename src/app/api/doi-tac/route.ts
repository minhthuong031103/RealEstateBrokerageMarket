import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const page = parseInt(searchParams?.get('page')); // Retrieves the value of the 'skip' parameter
  const limit = parseInt(searchParams?.get('limit')); // Retrieves the value of the 'limit' parameter
  
  const users = await prisma.user.findMany({
    where: {
      role: {
          contains: "doi_tac"
      }
  },
    skip: (page - 1) * limit,
    take: limit,
  });
  const usersCount = await prisma.user.count({
    where:{
      role: {
        contains: "doi_tac"
      },
      duyetDoiTac: "da_duyet",
    }
  });
  const data = {
    data: users,
    totalPages: Math.ceil(usersCount / limit),
    totalItems: usersCount,
  };
  return new Response(JSON.stringify(data), { status: 200 });
}
