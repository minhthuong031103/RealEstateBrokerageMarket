import prisma from '@/lib/prisma';

export async function GET(request) {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);
    const id = parseInt(searchParams.get('userId'));

    const allProducts = await prisma.baiViet.findMany({
        where: {
            userId: id
        }
    });

    if (!allProducts) {
        return new Response(JSON.stringify({ error: 'No Product found' }), {
            status: 404,
        });
    }

    return new Response(JSON.stringify(allProducts), { status: 200 });
}
