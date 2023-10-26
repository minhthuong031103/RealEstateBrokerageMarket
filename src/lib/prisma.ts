import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

// export default prisma.$extends({
//   result: {
//     user: {
//       searchName: {
//         needs: { name: true, email: true },
//         compute(user) {
//           return `${user.name} ${user.email}`;
//         },
//       },
//     },
//   },
// });

