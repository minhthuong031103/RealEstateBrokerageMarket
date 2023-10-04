
import { PartnerProps } from "@/components/estate/PartnersComp"

export default class Partners
{
    data: Array<PartnerProps>
    constructor() {}
    getData()
    {
        this.data = [
            {
                name: "Ecopark",
                description: "Công ty Ecopark là chuỗi bất động sản lớn hàng đầu tại Việt Nam và trên thế giới",
                address: "Linh Trung, Thủ Đức",
                img_url: "/istockphoto-925138596-612x612.jpg",
            },
            {
                name: "Ecopark1",
                description: "Công ty Ecopark là chuỗi bất động sản lớn hàng đầu tại Việt Nam và trên thế giới",
                address: "Linh Trung, Thủ Đức",
                img_url: "/istockphoto-925138596-612x612.jpg",
            },
            {
                name: "Ecopark11",
                description: "Công ty Ecopark là chuỗi bất động sản lớn hàng đầu tại Việt Nam và trên thế giới",
                address: "Linh Trung, Thủ Đức",
                img_url: "/istockphoto-925138596-612x612.jpg",
            },
            {
                name: "Ecopark11",
                description: "Công ty Ecopark là chuỗi bất động sản lớn hàng đầu tại Việt Nam và trên thế giới",
                address: "Linh Trung, Thủ Đức",
                img_url: "/istockphoto-925138596-612x612.jpg",
            },
            {
                name: "Ecopark11",
                description: "Công ty Ecopark là chuỗi bất động sản lớn hàng đầu tại Việt Nam và trên thế giới",
                address: "Linh Trung, Thủ Đức",
                img_url: "/istockphoto-925138596-612x612.jpg",
            },
        ]
        return this.data
    }
}