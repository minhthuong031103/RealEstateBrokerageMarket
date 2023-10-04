// 'use client'

// import { Label } from '@/components/ui/label'
// import { Select, SelectItem } from '@nextui-org/react'
// import React, { useEffect } from 'react'

// export const SelectDanhMuc = () => {

// const [selectedDanhMuc, setSelectedDanhMuc] = React.useState(new Set([]));
// const [danhMucTouched, setDanhMucTouched] = React.useState(false);
// const [isLoadingDanhMuc, setIsLoadingDanhMuc] = React.useState(false);
// const [danhMuc, setDanhMuc] = React.useState([]);
// useEffect(()=>{
//     async function getDanhMuc() {
//         setIsLoadingDanhMuc(true);
//         const res = await getRequest({
//           endPoint: 'https://provinces.open-api.vn/api/p/',
//         });

//         setDanhMuc(res);
//         setIsLoadingDanhMuc(false);
//       }
//       getDanhMuc();
// })

//     const isProvinceValid = selectedDanhMuc.size > 0
//   return (
//     <div><Label>Danh mục bất động sản</Label>
//     <Select
//         isRequired
//         key={'danhmuc'}
//         radius={'md'}
//         label="Danh mục bất động sản"
//         isInvalid={isProvinceValid || !provinceTouched ? false : true}
//         errorMessage={
//           isProvinceValid || !provinceTouched
//             ? ''
//             : 'Vui lòng chọn danh mục'
//         }
//         autoFocus={false}
//         placeholder="Chọn danh mục bất động sản"
//         selectedKeys={selectedProvince}
//         isLoading={isLoadingProvince}
//         onSelectionChange={setSelectedProvince}
//         className="w-full "
//         onClose={() => setProvinceTouched(true)}
//       >
//         {provinces?.map((province) => (
//           <SelectItem key={province.code} value={province.code}>
//             {province.name}
//           </SelectItem>
//         ))}
//       </Select></div>
//   )
// }

import React from 'react';

export const SelectDanhMuc = () => {
  return <div>SelectDanhMuc</div>;
};
