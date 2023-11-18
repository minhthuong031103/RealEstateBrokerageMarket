import { getRequest, postRequest } from '@/lib/fetch';
import toast from 'react-hot-toast';

export const useBatDongSan = () => {
  const fetchAllBatDongSan = async (page, props) => {
    let endPointUrl = `/api/bat-dong-san?page=${page}&limit=6`;
    
    const specialProps = {
        "Căn hộ": ["loaiCanHo", "huongBanCong", "huongCuaChinh", "soPhongNgu", "soPhongTam"],
        "Nhà ở": ["loaiNhaO", "huongCuaChinh", "soPhongNgu", "soPhongTam"],
        "Văn phòng": ["loaiVanPhong", "huongCuaChinh"],
        "Đất": ["loaiDatDai", "huongDat"]
    };

    const appendParam = (param, value) => {
        if (value !== "" && typeof value !== "undefined") {
            endPointUrl += `&${param}=${value}`;
        }
    };

    Object.keys(props).forEach(prop => {
        if (prop === "type" && specialProps[props[prop]]) {
          appendParam("type",props[prop]);
            specialProps[props[prop]].forEach(specialProp => {
                appendParam(specialProp, props[specialProp]);
            });
        } else {
            appendParam(prop, props[prop]);
        }
    });
    console.log(endPointUrl)
    const res = await getRequest({ endPoint: endPointUrl });
    return res;
};

  const fetchAllBatDongSanCuaDoiTac = async (page,props,userId) => {
    let endPointUrl = `/api/bat-dong-san/bat-dong-san-cua-doi-tac?page=${page}&limit=6&userId=${userId}`;
    const specialProps = {
      "Căn hộ": ["loaiCanHo", "huongBanCong", "huongCuaChinh", "soPhongNgu", "soPhongTam"],
      "Nhà ở": ["loaiNhaO", "huongCuaChinh", "soPhongNgu", "soPhongTam"],
      "Văn phòng": ["loaiVanPhong", "huongCuaChinh"],
      "Đất": ["loaiDatDai", "huongDat"]
  };

    const appendParam = (param, value) => {
        if (value !== "" && typeof value !== "undefined") {
            endPointUrl += `&${param}=${value}`;
        }
    };

    Object.keys(props).forEach(prop => {
        if (prop === "type" && specialProps[props[prop]]) {
          appendParam("type",props[prop]);
            specialProps[props[prop]].forEach(specialProp => {
                appendParam(specialProp, props[specialProp]);
            });
        } else {
            appendParam(prop, props[prop]);
        }
    });

    const res = await getRequest({ endPoint: endPointUrl });
    return res;
  };

  const fetchAllBatDongSanYeuThich = async (userId) => {
    const res = await getRequest({ endPoint: `/api/bat-dong-san/bat-dong-san-yeu-thich?userId=${userId}` });
    return res;
  };

  const checkTonTaiYeuThich = async (userId, postId)=>{
    const res = await getRequest({endPoint: `/api/bat-dong-san/bat-dong-san-yeu-thich/kiem-tra-ton-tai?userId=${userId}&postId=${postId}`});
    return res;
  }

  const themVaoYeuThich = async (data) => {
    const res = await postRequest({
      endPoint: '/api/bat-dong-san/bat-dong-san-yeu-thich/them',
      isFormData: false,
      formData: data,
    });
    if (res) {
      toast.success('Đã thêm vào danh sách yêu thích');
    }
  };

  const xoaKhoiYeuThich = async (data) => {
    const res = await postRequest({
      endPoint: '/api/bat-dong-san/bat-dong-san-yeu-thich/xoa',
      isFormData: false,
      formData: data,
    });
    if (res) {
      toast.success('Đã xóa khỏi danh sách yêu thích');
    }
  };

  const fetchBatDongSanNoiBat = async () => {
    const res = await getRequest({endPoint: `api/bat-dong-san/bat-dong-san-noi-bat`})
    return res;
  }

  const fetchBatDongSanTheoId = async (id) => {
    const res = await getRequest({endPoint: `/api/bat-dong-san/chi-tiet-bat-dong-san?id=${id}`})
    return res;
  }

  const fetchBatDongSanTheoIdDoiTac = async (id, userID) => {
    const res = await getRequest({endPoint: `/api/bat-dong-san/chi-tiet-bat-dong-san-doi-tac?id=${id}&userId=${userID}}`})
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


  const fetchAllBatDongSanCuaDoiTacTatCaTrangThai = async (page,props,userId) => {
    let endPointUrl = `/api/agency/realestate-list?page=${page}&limit=6&userId=${userId}`;
    const specialProps = {
      "Căn hộ": ["loaiCanHo", "huongBanCong", "huongCuaChinh", "soPhongNgu", "soPhongTam"],
      "Nhà ở": ["loaiNhaO", "huongCuaChinh", "soPhongNgu", "soPhongTam"],
      "Văn phòng": ["loaiVanPhong", "huongCuaChinh"],
      "Đất": ["loaiDatDai", "huongDat"]
  };

    const appendParam = (param, value) => {
        if (value !== "" && typeof value !== "undefined") {
            endPointUrl += `&${param}=${value}`;
        }
    };

    Object.keys(props).forEach(prop => {
        if (prop === "type" && specialProps[props[prop]]) {
          appendParam("type",props[prop]);
            specialProps[props[prop]].forEach(specialProp => {
                appendParam(specialProp, props[specialProp]);
            });
        } else {
            appendParam(prop, props[prop]);
        }
    });

    const res = await getRequest({ endPoint: endPointUrl });
    return res;
  };

  return {
    fetchAllBatDongSan,
    fetchAllBatDongSanCuaDoiTac,
    fetchBatDongSanTheoId,
    fetchBatDongSanNoiBat,
    fetchAllBatDongSanYeuThich,
    checkTonTaiYeuThich,
    themVaoYeuThich,
    xoaKhoiYeuThich,
    fetchAllDanhMuc,
    fetchLoaiHinhTheoDanhMuc,
    fetchAllBatDongSanCuaDoiTacTatCaTrangThai,
    fetchBatDongSanTheoIdDoiTac,
  };
};
