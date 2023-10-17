import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  // const page = parseInt(searchParams?.get('page')); // Retrieves the value of the 'skip' parameter
  // const limit = parseInt(searchParams?.get('limit')); // Retrieves the value of the 'limit' parameter
  const userId = parseInt(searchParams?.get('userId'));

  const bdsyeuthich = await prisma.favourite.findFirst({
    where: {
      userId: {
        equals: userId
      },
    },
    include: {
      baiViets: {
        include: {
          user: true,
          loaiHinh: {
            include: {
              loaiBDS: true,
            },
          },
        }
      },
    }
    // skip: (page - 1) * limit,
    // take: limit,
  });

  // const data = {
  //   data: bds,
  //   totalPages: Math.ceil(bds.length / limit),
  //   totalItems: bds.length,
  // };
  // console.log(bds[0].sanPham.chiTietCanHo)
  // console.log(bds)
  return new Response(JSON.stringify(bdsyeuthich), { status: 200 });
}
