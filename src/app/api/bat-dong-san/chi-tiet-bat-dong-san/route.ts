
import prisma from '@/lib/prisma';

export async function GET(request:Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const id = parseInt(searchParams.get("id")); // Retrieves the value of the 'skip' parameter
  const bds=await prisma.baiViet.findMany({
    where: {
        id: {
            equals: id
        }
    },
    include: {
      loaiHinh: {
        include: {
          loaiBDS: true
        }
      },
      user: true,     
    },
  })
  // console.log(bds[0].sanPham.chiTietCanHo)
  // console.log(bds)
  if (!bds)
  return new Response(JSON.stringify({ message: 'Không tìm thấy dữ liệu' }), {
    status: 404,
  });
  return new Response(JSON.stringify(bds), { status: 200 });
}
