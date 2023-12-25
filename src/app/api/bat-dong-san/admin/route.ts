import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const page = parseInt(searchParams?.get('page')); // Retrieves the value of the 'skip' parameter
  const limit = parseInt(searchParams?.get('limit')); // Retrieves the value of the 'limit' paramete
  const trangThai = searchParams?.get('type');
  const searchWord = searchParams?.get('search');

  const countItem = await prisma.baiViet.count({
    where: {
        trangThai: {
            equals: trangThai || "",
        },
        tieuDe: {
          contains: searchWord || ""
        }
    },
  });

  const bds = await prisma.baiViet.findMany({
    include: {
      loaiHinh: {
        include: {
          loaiBDS: true,
        },
      },
      user: true,
    },
    where: {
        trangThai: {
            equals: trangThai || "",
        },
        tieuDe: {
          contains: searchWord || ""
        }
    },
    skip: (page - 1) * limit,
    take: limit,
  });

  const data = {
    data: bds,
    totalPages: Math.ceil(countItem / limit),
    totalItems: countItem,
  };

  return new Response(JSON.stringify(data), { status: 200 });
}
