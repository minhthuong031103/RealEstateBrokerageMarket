import prisma from '@/lib/prisma';
import { uploadthingApi } from '@/lib/uploadthingServer';
import { getImageKey } from '@/lib/utils';

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const id = parseInt(searchParams.get('id'));
    const body = await req.json();

    if (body.deletedImageProductFiles) {
      const deletedImages = JSON.parse(body.deletedImageProductFiles);

      for (const image of deletedImages) {
        const imageKey = getImageKey(image.url);

        uploadthingApi.deleteFiles([imageKey]);
      }

      delete body.deletedImageProductFiles;
    }

    const baiViet = await prisma.baiViet.update({
      where: {
        id: id,
      },
      data: {
        ...body,
      },
    });

    return new Response(JSON.stringify(baiViet), { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
}