import prisma from "@/lib/prisma";

export async function GET (){
    const bds=await prisma.baiViet.findMany({
        include:{
            user:true,
            sanPham:{
                include:{
                    chiTietCanHo:{
                        include:{
                            loaiCanHo:true
                        }
                    },
                    chiTietDat:true,
                    chiTietNhaO:true,
                    chiTietVanPhong:true
                }
            }
        }
    })
    console.log(bds[0].sanPham.chiTietCanHo)
    console.log(bds)
    return new Response(JSON.stringify(bds), {status:200})
}