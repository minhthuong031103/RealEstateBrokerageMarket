import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { decode } from "querystring";

export async function GET(req: Request) {
  const url = req.url;
  // console.log(url)
  const qsMatch = url.match(/(?=\?).*/);
  let qs: string = "";
  if (qsMatch) {
    qs = qsMatch[0].substring(1);
  }
  const args = decode(qs);

  const query: Prisma.UserFindManyArgs = {};
  const where: Prisma.UserWhereInput = {};
  let search = "";
  let returnCount = false;
  // const keys: string[] = Object.keys(args);
  Object.keys(args).forEach(function (key: string) {
    if (key == "getcount") {
      returnCount = true;
    } else if (key == "id") {
      where.id = parseInt(args[key] as string);
    } else if (key == "start") {
      query.skip = parseInt(args[key] as string);
    } else if (key == "count") {
      query.take = parseInt(args[key] as string);
    } else if (key == "search") {
      search = args[key] as string;
    } else if (["getcount"].indexOf(key) < 0) {
      if (Array.isArray(args[key])) {
        where.AND = where.AND ? where.AND : [];
        const andItem: Prisma.UserWhereInput = {};
        andItem.OR = [];
        (args[key] as string[]).forEach((elem) => {
          andItem.OR?.push({
            [key]: {
              equals: elem ? elem : null,
            },
          });
        });
        (where.AND as Prisma.UserWhereInput[]).push(andItem);
      } else {
        where[key] = args[key] as string;
      }
    }
  });
  if (returnCount) {
    const count = await prisma.user.count({ where: where });
    return new Response(JSON.stringify({ count: count }));
  }
  query["where"] = {
    ...where,
    AND: [
      {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            email: {
              contains: search,
            },
          },
        ],
      },
      ...(where.AND
        ? Array.isArray(where.AND)
          ? where.AND
          : [where.AND]
        : []),
    ],
  };
  const result = await prisma.user.findMany(query);
  return new Response(JSON.stringify(result), {
    headers: [["Access-Control-Allow-Origin", "*"]],
  });
}
