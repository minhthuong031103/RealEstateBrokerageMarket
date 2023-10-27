import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  let success = false;
  const transactions: any[] = []
  if (Array.isArray(body.indices)) {
    body.indices.forEach((item) => {
      transactions.push(prisma.banners.update({
        where: {
          id: item.id,
        },
        data: {
          bannerIndex: item.bannerIndex + 100000, // dirty hack
        },
      }));
    });
    await prisma.$transaction(transactions)
    body.indices.forEach((item) => {
      transactions.push(prisma.banners.update({
        where: {
          id: item.id,
        },
        data: {
          bannerIndex: item.bannerIndex,
        },
      }));
    });
    await prisma.$transaction(transactions)
    success = true;
  }
  return new Response(
    JSON.stringify({ message: success ? "Success" : "Invalid arguments" }),
    { status: success ? 200 : 400 }
  );
}
