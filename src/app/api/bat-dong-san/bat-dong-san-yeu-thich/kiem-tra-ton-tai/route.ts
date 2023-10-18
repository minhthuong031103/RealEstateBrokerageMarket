import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const userId = parseInt(searchParams?.get('userId'));
  const postId = parseInt(searchParams?.get('postId'));

  const recordSave = await prisma.favourite.findFirst({
    where: {
      userId: {
        equals: userId,
      }
    } 
  })
  if (!recordSave)
  return new Response(JSON.stringify(null), {status: 200})

  const bdsyeuthich = await prisma.baiVietToFavourite.findFirst({
    where: {
      B: {
        equals: recordSave?.id,
      },
      A: {
        equals: postId,
      }
    },
  });
  return new Response(JSON.stringify(bdsyeuthich), { status: 200 });
}
