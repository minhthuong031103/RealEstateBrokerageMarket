import { getRequest } from '@/lib/fetch';

export const useBaiVietDoiTac = () => {
    const getBaiVietDoiTac = async (userId) => {
        try{
            console.log(userId);
            const res = await getRequest({ endPoint: `api/agency/realestate?userId=${userId}` });
            console.log(res);
            return res;
        } catch (error){
            console.error('An error occurred:', error);
            return null;
        }
    };
    return {getBaiVietDoiTac};
};