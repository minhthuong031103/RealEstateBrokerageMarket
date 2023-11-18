import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  let success = false;
  if (body.srcImg) {
    const listDesc = await prisma.banners.findMany({
      orderBy: [
        {
          bannerIndex: "desc",
        },
      ],
      take: 1,
    });
    const bottom = listDesc.length > 0 ? listDesc[0] : { bannerIndex: 0 };
    await prisma.banners.create({
      data: {
        bannerIndex: bottom.bannerIndex + 1,
        anhBanner: body.srcImg,
      },
    });
    success = true;
  }
  return new Response(
    JSON.stringify({ message: success ? "Success" : "Invalid arguments" }),
    { status: success ? 200 : 400 }
  );
}
