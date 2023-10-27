import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  if (body.id) {
    await prisma.banners.delete({ where: { id: body.id } });
    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  }

  return new Response("Invalid arguments", { status: 400 });
}
