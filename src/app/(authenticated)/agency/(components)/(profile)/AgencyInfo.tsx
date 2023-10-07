import { Card } from '@/components/ui/card'
import React from 'react'

function AgencyInfo() {
  return (
    <div>
      <Card className="bg-white p-4 rounded-lg shadow-md relative mt-4">
        <h1 className="text-xl font-semibold">Thông tin cá nhân</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h2 className="font-semibold">Họ và tên</h2>
            <p>Trương Anh Khoa</p>
          </div>
          <div>
            <h2 className="font-semibold">Số điện thoại</h2>
            <p>(+84) 868103589</p>
          </div>
          <div>
            <h2 className="font-semibold">Email</h2>
            <p>anhkhoatqt11@gmail.com</p>
          </div>
          <div>
            <h2 className="font-semibold">Thông tin mô tả</h2>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
        </div>
        {/* <div className="md:absolute top-4 right-4 mt-4 mr-4 md:top-0 md:right-0">
          <Button className="w-full md:w-auto">Chỉnh sửa</Button>
        </div> */}
      </Card>

      <Card className="bg-white p-4 rounded-lg shadow-md relative mt-4">
        <h1 className="text-xl font-semibold">Địa chỉ</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h2 className="font-semibold">Quốc gia</h2>
            <p>Việt Nam</p>
          </div>
          <div>
            <h2 className="font-semibold">Thành phố</h2>
            <p>Hồ Chí Minh</p>
          </div>
          <div>
            <h2 className="font-semibold">Quận/huyện</h2>
            <p>Thủ Đức</p>
          </div>
          <div>
            <h2 className="font-semibold">Số nhà</h2>
            <p>01 Linh Trung</p>
          </div>
        </div>
        {/* <div className="md:absolute top-4 right-4 mt-4 mr-4 md:top-0 md:right-0">
          <Button className="w-full md:w-auto">Chỉnh sửa</Button>
        </div> */}
      </Card>
    </div>

  )
}

export default AgencyInfo