import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  console.log('🚀 ~ file: route.ts:6 ~ POST ~ body:', body);
  const session = await getSession();

  const loaiHinh = await prisma.loaiHinh.findUnique({
    where: {
      name: body.loaiHinh,
    },
  });
  const updateData = {
    luot: {
      decrement: 1,
    },
    ...(body?.nhan === 'Nổi bật'
      ? {
          luotVip: {
            decrement: 1,
          },
        }
      : {}),
    ...(body?.nhan === 'Yêu thích'
      ? {
          luotChuyenNghiep: {
            decrement: 1,
          },
        }
      : {}),
  };

  const [baiViet, created] = await prisma.$transaction([
    prisma.baiViet.create({
      data: {
        ...body,

        user: {
          connect: {
            id: session?.user.id,
          },
        },
        loaiHinh: {
          connect: {
            id: loaiHinh?.id,
          },
        },
      },
    }),
    prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: { ...updateData },
    }),
  ]);

  if (baiViet && created) {
    return new Response(JSON.stringify(baiViet), { status: 200 });
  }
}
