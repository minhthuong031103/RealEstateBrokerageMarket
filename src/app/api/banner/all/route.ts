
import prisma from '@/lib/prisma';

export async function GET() {
  const banners=await prisma.banners.findMany({
    orderBy: {
        bannerIndex: 'asc'
    },
  })
  if (!banners)
  return new Response(JSON.stringify({ message: 'Không tìm thấy dữ liệu' }), {
    status: 404,
  });
  return new Response(JSON.stringify({items: banners, message: "success"}), { status: 200 });
}
