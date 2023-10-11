
import prisma from '@/lib/prisma';

export async function GET(request:Request) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);
  const page = parseInt(searchParams.get("page")); // Retrieves the value of the 'skip' parameter
  const limit = parseInt(searchParams.get("limit")); // Retrieves the value of the 'limit' parameter
  const searchWord = searchParams.get("searchWord");
  const location = searchParams.get("location");
  const type = searchParams.get("type");
  const isRent = searchParams.get("isRent");
  const loaiNhaO = searchParams.get("loaiNhaO");
  const loaiVanPhong = searchParams.get("loaiVanPhong");
  const loaiDat = searchParams.get("loaiDat");
  const loaiCanHo = searchParams.get("loaiCanHo");
  const huongBanCong = searchParams.get("huongBanCong");
  const huongCuaChinh = searchParams.get("huongCuaChinh");
  const huongDat = searchParams.get("huongDat");
  const soPhongNgu = searchParams.get("soPhongNgu");
  const soPhongTam = searchParams.get("soPhongTam");
  const branch = searchParams.get("branch");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const minSquare = searchParams.get("minSquare");
  const maxSquare = searchParams.get("maxSquare");

  let query = {
    // Your initial query options
    include: {
      loaiHinh: {
        include: {
          loaiBDS: true
        }
      },
      user: true,     
    },
    skip:(page-1)*limit,
    take:limit,
    where: {
      tieuDe: {
        contains: searchWord || ""
      },
      nhan: {
        contains: branch || ""
      },
      loaiHinh: {
        loaiBDS: {
          name: {
            contains: type || ""
          }
        },
        name: {}
      },
      trangThai: {
        equals: "Đã duyệt"
      },
      diaChi: {
        contains: location || ""
      },

    }
  };
  if (isRent)
  {

    query = {
      ...query,
      where: {
        ...query.where,
        isChothue: {
          equals: isRent==="true"?true:false
        }
      },
    };
  }
  if (minPrice)
  {
    query = {
      ...query,
      where: {
        ...query.where,
        gia: {
          gte: parseInt(minPrice)
        }
      },
    };
  }
  if (maxPrice)
  {
    query = {
      ...query,
      where: {
        ...query.where,
        gia: {
          ...query.where.gia,
          lte: parseInt(maxPrice)
        }
      },
    };
  }
  if (minSquare)
  {
    query = {
      ...query,
      where: {
        ...query.where,
        dienTich: {
          gte: parseInt(minSquare)
        }
      },
    };
  }
  if (maxSquare)
  {
    query = {
      ...query,
      where: {
        ...query.where,
        dienTich: {
          ...query.where.dienTich,
          lte: parseInt(maxSquare)
        }
      },
    };
  }
  if (loaiCanHo && loaiCanHo !== "")
  {
    query = {
      ...query,
      where: {
        ...query.where,
        loaiHinh: {
          ...query.where.loaiHinh,
          name: {
            contains: loaiCanHo
          }
        }
      },
    };
  }
  if (loaiNhaO && loaiNhaO !== "")
  {
    query = {
      ...query,
      where: {
        ...query.where,
        loaiHinh: {
          ...query.where.loaiHinh,
          name: {
            contains: loaiNhaO 
          }
        }
      },
    };
  }
  if (loaiVanPhong && loaiVanPhong !== "")
  {
    query = {
      ...query,
      where: {
        ...query.where,
        loaiHinh: {
          ...query.where.loaiHinh,
          name:
          {
            contains: loaiVanPhong 
          }
        }
      },
    };
  }
  if (loaiDat && loaiDat !== "")
  {
    query = {
      ...query,
      where: {
        ...query.where,
        loaiHinh: {
          ...query.where.loaiHinh,
          name: {
            contains: loaiDat
          }
        }
      },
    };
  }
  if (type && type !== "")
  {
    if (type === "Căn hộ" || type === "Nhà ở")
    {
      if (soPhongNgu)
      {
        if (soPhongNgu === "+")
        {
          query = {
            ...query,
            where: {
              ...query.where,
              soPhongNgu: {
                gte: 7 
              }
            },
          };
        }
        else {
          query = {
            ...query,
            where: {
              ...query.where,
              soPhongNgu: {
                equals: parseInt(soPhongNgu)
              }
            },
          };
        }
      }
      if (soPhongTam)
      {
        if (soPhongTam === "+")
        {
          query = {
            ...query,
            where: {
              ...query.where,
              soPhongTam: {
                gte: 7 
              }
            },
          };
        }
        else {
          query = {
            ...query,
            where: {
              ...query.where,
              soPhongTam: {
                equals: parseInt(soPhongTam)
              }
            },
          };
        }
      }
    }
    if (type === "Đất")
    {
      if (huongDat)
      {
        query = {
          ...query,
          where: {
            ...query.where,
            huongDat: {
              equals: huongDat
            }
          },
        };
      }
    }
    else {
      if (huongCuaChinh)
      {
        query = {
          ...query,
          where: {
            ...query.where,
            huongCuaChinh: {
              equals: huongCuaChinh
            }
          },
        };
      }
    }
    if (type === "Căn hộ")
    {
      if (huongBanCong)
      {
        query = {
          ...query,
          where: {
            ...query.where,
            huongBanCong: {
              equals: huongBanCong
            }
          },
        };
      }
    }
  }
  console.log(query)
  const bds=await prisma.baiViet.findMany(query)
  const data={
    data:bds,
    totalPages:Math.ceil((bds.length)/limit),
    totalItems:bds.length
  }
  // console.log(bds[0].sanPham.chiTietCanHo)
  // console.log(bds)
  return new Response(JSON.stringify(data), { status: 200 });
}
