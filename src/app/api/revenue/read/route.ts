import prisma from "@/lib/prisma";
import { decode } from "querystring";


export async function GET({url}: Request)
{
    const qsMatch = url.match(/(?=\?).*/);
    let qs: string = "";
    if (qsMatch) {
      qs = qsMatch[0].substring(1);
    }
    const args = decode(qs);

    let year = (new Date()).getFullYear();

    Object.keys(args).forEach(key => {
        switch (key)
        {
            case "year":
                year = parseInt(args[key] as string);
                break;
            default:
                break;
        }
    })

    const result = await prisma.revenue.findMany({where: {
        createdAt: {
            gte: new Date(year, 0).toISOString(),
            lt: new Date(year + 1, 0).toISOString()
        }
    }})

    return new Response(JSON.stringify({data: result}), {status: 200})
}