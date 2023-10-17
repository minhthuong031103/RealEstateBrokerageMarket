
import prisma from "@/lib/prisma";
import { decode } from "querystring";

export async function GET(req: Request)
{
    const qsMatch = req.url.match(/(?=\?).*/)
    let qs: string = "";
    if (qsMatch)
    {
        qs = qsMatch[0].substring(1);
    }
    const args = decode(qs);

    // if (Object.keys(args).length > 0)
    {
        const where: any = {};
        // const keys: string[] = Object.keys(args);
        Object.keys(args).forEach(function(key: string)
        {
            if (key == "id")
            {
                where[key] = parseInt(args[key] as string);
            }
            else
            {
                where[key] = args[key] as string;
            }
        })
        // if (args.id)
        // {
        //     where.id = parseInt(Array.isArray(args.id) ? args.id.join('') : args.id)
        //     // const result = await prisma.user.findFirst({where: {id: parseInt(id)}});
        //     // return new Response(JSON.stringify(result))
        // }
        // if (args.role)
        // {
        //     where.role = Array.isArray(args.role) ? args.role.join('') : args.role
        //     // return new Response(JSON.stringify(result))
        // }
        const result = await prisma.user.findMany({where: where});
        return new Response(JSON.stringify(result), {headers: [["Access-Control-Allow-Origin", "*"]]});
    }

    return new Response(JSON.stringify(await prisma.user.findMany({})))

}