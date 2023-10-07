import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();
  const session = await getSession();

  const loaiHinh = await prisma.loaiHinh.findUnique({
    where: {
      name: body.loaiHinh,
    },
  });
  const baiViet = await prisma.baiViet.create({
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
  });
  console.log(baiViet);
  console.log(body);
}
