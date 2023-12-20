import prisma from '@/lib/prisma';

const size = [
  {
    size: 'EU 38.5',
    number: 0,
  },
  {
    size: 'EU 39',
    number: 1,
  },
  {
    size: 'EU 40',
    number: 2,
  },
  {
    size: 'EU 41',
    number: 3,
  },
  {
    size: 'EU 42',
    number: 4,
  },
  {
    size: 'EU 43',
    number: 5,
  },
  {
    size: 'EU 44',
    number: 6,
  },
  {
    size: 'EU 45',
    number: 7,
  },
  {
    size: 'EU 46',
    number: 8,
  },
];

export async function POST(request: Request) {
  const re = await request.json();
  const res = await prisma.product.create({
    data: {
      name: re.name,
      price: re.price,
      description: re.description,
      images: JSON.stringify(re.image),
      sizes: JSON.stringify(size),
      thumbnail: JSON.stringify(re.image[0]),
    },
  });
}
