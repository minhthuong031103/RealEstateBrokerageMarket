import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const body = await req.json();

  const resultSave = await prisma.favourite.findFirst({
    where: {
      userId: body.userId,
    },
  });
  
  if (!resultSave)
  {
    const fav = await prisma.favourite.create({
      data: {
        userId: body.userId,
        baiViets: {
          connect: [{id: body.postId}]
        }
      },
    });
    if (fav) {
      return new Response(JSON.stringify(fav), { status: 200 });
    }
  }
  else {
    const fav = await prisma.favourite.update({
      where: {
        id: resultSave?.id,
      },
      data: {
        baiViets: {
          connect: [{id: body.postId}]
        }
      },
    });
    if (fav) {
      return new Response(JSON.stringify(fav), { status: 200 });
    }
  }
}
