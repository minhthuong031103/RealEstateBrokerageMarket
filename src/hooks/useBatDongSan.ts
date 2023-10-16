import { getRequest, postRequest } from '@/lib/fetch';

export const useBatDongSan = () => {
  const fetchAllBatDongSan = async (page,props) => {
    let endPointUrl = `/api/bat-dong-san?page=${page}&limit=6`;
    if (typeof props !== "undefined")
    {

      if (props?.searchWord !== "")
      {
        endPointUrl+=`&searchWord=${props?.searchWord}`
      }
      if (props?.location !== "")
      {
        endPointUrl+=`&location=${props?.location}`
      }
      if (props?.branch !== "")
      {
        endPointUrl+=`&branch=${props?.branch}`
      }
      if (props?.isRent !== "")
      {
        endPointUrl+=`&isRent=${props?.isRent}`
      }
      if (props?.type !== "")
      {
        endPointUrl+=`&type=${props?.type}`;
        if (props?.type === "Căn hộ")
        {
          if (props?.loaiCanHo !== "")
          {
            endPointUrl+=`&loaiCanHo=${props?.loaiCanHo}`
          }
          if (props?.huongBanCong !== "")
          {
            endPointUrl+=`&huongBanCong=${props?.huongBanCong}`
          }
          if (props?.huongCuaChinh !== "")
          {
            endPointUrl+=`&huongCuaChinh=${props?.huongCuaChinh}`
          }
          if (props?.soPhongNgu !== "")
          {
            endPointUrl+=`&soPhongNgu=${props?.soPhongNgu}`
          }
          if (props?.soPhongTam !== "")
          {
            endPointUrl+=`&soPhongTam=${props?.soPhongTam}`
          }
        }
        else if (props?.type === "Nhà ở")
        {
          if (props?.loaiNhaO !== "")
          {
            endPointUrl+=`&loaiNhaO=${props?.loaiNhaO}`
          }
          if (props?.huongCuaChinh !== "")
          {
            endPointUrl+=`&huongCuaChinh=${props?.huongCuaChinh}`
          }
          if (props?.soPhongNgu !== "")
          {
            endPointUrl+=`&soPhongNgu=${props?.soPhongNgu}`
          }
          if (props?.soPhongTam !== "")
          {
            endPointUrl+=`&soPhongTam=${props?.soPhongTam}`
          }
        }
        else if (props?.type === "Văn phòng")
        {
          if (props?.loaiVanPhong !== "")
          {
            endPointUrl+=`&loaiVanPhong=${props?.loaiVanPhong}`
          }
          if (props?.huongCuaChinh !== "")
          {
            endPointUrl+=`&huongCuaChinh=${props?.huongCuaChinh}`
          }
        }
        else if (props?.type === "Đất")
        {
          if (props?.loaiDatDai !== "")
          {
            endPointUrl+=`&loaiDatDai=${props?.loaiDatDai}`
          }
          if (props?.huongDat !== "")
          {
            endPointUrl+=`&huongDat=${props?.huongDat}`
          }
        }
      }
      if (props?.minPrice !== "")
      {
        endPointUrl+=`&minPrice=${props?.minPrice}`
      }
      if (props?.maxPrice !== "")
      {
        endPointUrl+=`&maxPrice=${props?.maxPrice}`
      }
      if (props?.minSquare !== "")
      {
        endPointUrl+=`&minSquare=${props?.minSquare}`
      }
      if (props?.maxSquare !== "")
      {
        endPointUrl+=`&maxSquare=${props?.maxSquare}`
      }
    }
    const res = await getRequest({ endPoint: endPointUrl });
    return res;
  };

  const fetchAllBatDongSanCuaDoiTac = async (page,props,userId) => {
    let endPointUrl = `/api/bat-dong-san/bat-dong-san-cua-doi-tac?page=${page}&limit=6&userId=${userId}`;
    if (typeof props !== "undefined")
    {

      if (props?.searchWord !== "")
      {
        endPointUrl+=`&searchWord=${props?.searchWord}`
      }
      if (props?.location !== "")
      {
        endPointUrl+=`&location=${props?.location}`
      }
      if (props?.branch !== "")
      {
        endPointUrl+=`&branch=${props?.branch}`
      }
      if (props?.isRent !== "")
      {
        endPointUrl+=`&isRent=${props?.isRent}`
      }
      if (props?.type !== "")
      {
        endPointUrl+=`&type=${props?.type}`;
        if (props?.type === "Căn hộ")
        {
          if (props?.loaiCanHo !== "")
          {
            endPointUrl+=`&loaiCanHo=${props?.loaiCanHo}`
          }
          if (props?.huongBanCong !== "")
          {
            endPointUrl+=`&huongBanCong=${props?.huongBanCong}`
          }
          if (props?.huongCuaChinh !== "")
          {
            endPointUrl+=`&huongCuaChinh=${props?.huongCuaChinh}`
          }
          if (props?.soPhongNgu !== "")
          {
            endPointUrl+=`&soPhongNgu=${props?.soPhongNgu}`
          }
          if (props?.soPhongTam !== "")
          {
            endPointUrl+=`&soPhongTam=${props?.soPhongTam}`
          }
        }
        else if (props?.type === "Nhà ở")
        {
          if (props?.loaiNhaO !== "")
          {
            endPointUrl+=`&loaiNhaO=${props?.loaiNhaO}`
          }
          if (props?.huongCuaChinh !== "")
          {
            endPointUrl+=`&huongCuaChinh=${props?.huongCuaChinh}`
          }
          if (props?.soPhongNgu !== "")
          {
            endPointUrl+=`&soPhongNgu=${props?.soPhongNgu}`
          }
          if (props?.soPhongTam !== "")
          {
            endPointUrl+=`&soPhongTam=${props?.soPhongTam}`
          }
        }
        else if (props?.type === "Văn phòng")
        {
          if (props?.loaiVanPhong !== "")
          {
            endPointUrl+=`&loaiVanPhong=${props?.loaiVanPhong}`
          }
          if (props?.huongCuaChinh !== "")
          {
            endPointUrl+=`&huongCuaChinh=${props?.huongCuaChinh}`
          }
        }
        else if (props?.type === "Đất")
        {
          if (props?.loaiDatDai !== "")
          {
            endPointUrl+=`&loaiDatDai=${props?.loaiDatDai}`
          }
          if (props?.huongDat !== "")
          {
            endPointUrl+=`&huongDat=${props?.huongDat}`
          }
        }
      }
      if (props?.minPrice !== "")
      {
        endPointUrl+=`&minPrice=${props?.minPrice}`
      }
      if (props?.maxPrice !== "")
      {
        endPointUrl+=`&maxPrice=${props?.maxPrice}`
      }
      if (props?.minSquare !== "")
      {
        endPointUrl+=`&minSquare=${props?.minSquare}`
      }
      if (props?.maxSquare !== "")
      {
        endPointUrl+=`&maxSquare=${props?.maxSquare}`
      }
    }
    const res = await getRequest({ endPoint: endPointUrl });
    return res;
  };

  const fetchAllBatDongSanYeuThich = async (userId) => {
    const res = await getRequest({ endPoint: `/api/bat-dong-san/bat-dong-san-yeu-thich?userId=${userId}` });
    return res;
  };

  const fetchBatDongSanNoiBat = async () => {
    const res = await getRequest({endPoint: `api/bat-dong-san/bat-dong-san-noi-bat`})
    return res;
  }

  const fetchBatDongSanTheoId = async (id) => {
    const res = await getRequest({endPoint: `/api/bat-dong-san/chi-tiet-bat-dong-san?id=${id}`})
    return res;
  }

 const fetchAllDanhMuc = async () => {
    const res = await getRequest({ endPoint: '/api/bat-dong-san/danh-muc' });
    return res;
  };

  const fetchLoaiHinhTheoDanhMuc = async (name: string) => {
    const res = await postRequest({
      endPoint: '/api/bat-dong-san/loai-hinh',
      isFormData: false,
      formData: { name },
    });
    return res;
  };

  return {
    fetchAllBatDongSan,
    fetchAllBatDongSanCuaDoiTac,
    fetchBatDongSanTheoId,
    fetchBatDongSanNoiBat,
    fetchAllBatDongSanYeuThich,
    fetchAllDanhMuc,
    fetchLoaiHinhTheoDanhMuc,
  };
};
