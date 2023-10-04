import { getRequest } from "@/lib/fetch"

export const useBatDongSan = () => {
    const fetchBatDongSanAll = async () => {
        const res = await getRequest({endPoint: "/api/bat-dong-san"});
        return res;
    }
    return {
        fetchBatDongSanAll
    }
}

