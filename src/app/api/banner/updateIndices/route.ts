import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  let success = false;
  const transactions: any[] = []
  if (body.id !== null && body.from !== null && body.to !== null && body.to !== body.from) {
    
    const LARGE_NUMBER = 1000000
    
    let query: any = null
    const bUp = body.to < body.from
    query = prisma.banners.updateMany(
      {
        where: {
          bannerIndex:
          {
            gte: bUp ? body.to : body.from,
            lte: bUp ? body.from : body.to,
          }
        },
        data:{
          bannerIndex: {
            increment: LARGE_NUMBER
          }
        },
      }
    )
    transactions.push(query)
    query = prisma.banners.update(
      {
        where: {
          id: body.id
        },
        data: {
          bannerIndex: body.to
        }
      }
    )
    transactions.push(query)
    query = prisma.banners.updateMany(
      {
        where: {
          bannerIndex: {
            gte: LARGE_NUMBER
          }
        },
        data: {
          bannerIndex: {
            increment: (bUp ? 1 : -1) - LARGE_NUMBER
          }
        }
      }
    )
    transactions.push(query)

    await prisma.$transaction(transactions)
    success = true
  }
  return new Response(
    JSON.stringify({ message: success ? "Success" : "Invalid arguments" }),
    { status: success ? 200 : 400 }
  );
}
