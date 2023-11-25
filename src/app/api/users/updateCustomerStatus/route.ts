import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  if (typeof body.id == 'number' && typeof body.newStatus == 'string') {
    await prisma.user.update({ 
        where: { id: parseInt(body.id) },
        data: {duyetKhachHang: body.newStatus,
        role: 'khach_hang'}
     });
     return new Response(JSON.stringify(await prisma.user.findFirst({where: {id: body.id}})));
  }
  return new Response("Invalid arguments", {status: 400})
}
