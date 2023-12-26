import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const page = parseInt(searchParams?.get('page')); // Retrieves the value of the 'skip' parameter
  const limit = parseInt(searchParams?.get('limit')); // Retrieves the value of the 'limit' parameter
  const userId = parseInt(searchParams?.get('userId'));
  const searchWord = searchParams.get('searchWord');
  const location = searchParams.get('location');
  const type = searchParams.get('type');
  const isRent = searchParams.get('isRent');
  const loaiNhaO = searchParams.get('loaiNhaO');
  const loaiVanPhong = searchParams.get('loaiVanPhong');
  const loaiDat = searchParams.get('loaiDat');
  const loaiCanHo = searchParams.get('loaiCanHo');
  const huongBanCong = searchParams.get('huongBanCong');
  const huongCuaChinh = searchParams.get('huongCuaChinh');
  const huongDat = searchParams.get('huongDat');
  const soPhongNgu = searchParams.get('soPhongNgu');
  const soPhongTam = searchParams.get('soPhongTam');
  const branch = searchParams.get('branch');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const minSquare = searchParams.get('minSquare');
  const maxSquare = searchParams.get('maxSquare');

  const query = {
    tieuDe: {
      contains: searchWord || '',
    },
    nhan: {
      contains: branch || '',
    },
    loaiHinh: {
      loaiBDS: {
        name: {
          contains: type || '',
        },
      },
      name: {
        contains: loaiCanHo || loaiNhaO || loaiVanPhong || loaiDat || '',
      },
    },
    trangThai: {
      equals: 'da_duyet',
    },
    diaChi: {
      contains: location || '',
    },
    ...(userId !== null
      ? {
          userId: {
            equals: userId || 1,
          },
        }
      : {}),

    ...(isRent !== null
      ? {
          isChothue: {
            equals: isRent === 'true',
          },
        }
      : {}),
    ...(huongBanCong !== null
      ? { huongBanCong: { equals: huongBanCong } }
      : {}),
    ...(huongCuaChinh !== null
      ? { huongCuaChinh: { equals: huongCuaChinh } }
      : {}),
    ...(huongDat !== null ? { huongDat: { equals: huongDat } } : {}),
    ...(soPhongNgu !== null
      ? {
          soPhongNgu: {
            equals: parseInt(soPhongNgu),
          },
        }
      : {}),
    ...(soPhongTam !== null
      ? {
          soPhongTam: {
            equals: parseInt(soPhongTam),
          },
        }
      : {}),

    gia: {
      gte: minPrice ? parseInt(minPrice) : 0,
      lte: maxPrice ? parseInt(maxPrice) : Number.MAX_SAFE_INTEGER,
    },
    dienTich: {
      gte: minSquare ? parseInt(minSquare) : 0,
      lte: maxSquare ? parseInt(maxSquare) : Number.MAX_SAFE_INTEGER,
    },
  };

  const bds = await prisma.baiViet.findMany({
    include: {
      loaiHinh: {
        include: {
          loaiBDS: true,
        },
      },
      user: true,
    },
    skip: (page - 1) * limit,
    take: limit,
    where: query,
  });
  const countItem = await prisma.baiViet.count({
    where: query,
  });
  const data = {
    data: bds,
    totalPages: Math.ceil(countItem / limit),
    totalItems: countItem,
  };
  // console.log(bds[0].sanPham.chiTietCanHo)
  // console.log(bds)
  return new Response(JSON.stringify(data), { status: 200 });
}
