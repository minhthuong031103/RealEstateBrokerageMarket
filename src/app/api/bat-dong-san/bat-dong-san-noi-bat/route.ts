
import prisma from '@/lib/prisma';

export async function GET() {
  const bds=await prisma.baiViet.findMany({
    include: {
      loaiHinh: {
        include: {
          loaiBDS: true,
        },
      },
    },
    where: {
        nhan: {
            contains: "Nổi bật"
        },
        trangThai: {
          equals: "da_duyet"
        }
    },
    orderBy: {
        ngayDang: 'desc'
    },
    take: 10
  })
  if (!bds)
  return new Response(JSON.stringify({ message: 'Không tìm thấy dữ liệu' }), {
    status: 404,
  });
  return new Response(JSON.stringify(bds), { status: 200 });
}
