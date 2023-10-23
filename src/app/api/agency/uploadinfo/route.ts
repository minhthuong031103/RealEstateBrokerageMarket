import { getSession } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {

    const body = await req.json();
    const session = await getSession();


    const User = await prisma.user.update({
        where: {
            id: session?.user.id,
        },
        data:{
            ...body,
        }
    });

    return new Response(JSON.stringify(User), { status: 200 });

}
