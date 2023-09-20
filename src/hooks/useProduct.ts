export const useProduct = () => {
  const onGetProductDetail = async (slug) => {
    const productDetail = await fetch(
      `${process.env.API_HOST}/api/product/detail?productId=${slug}`,
      {
        cache: 'no-cache',
      }
    );
    const data = await productDetail?.json();
    console.log(data);
    return data;
  };

  return { onGetProductDetail };
};
