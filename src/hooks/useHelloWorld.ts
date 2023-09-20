export const useHelloWorld = () => {
  const onGetHelloWorld = async () => {
    const response = await fetch('/api/helloworld');
    const data = await response.json();
    console.log('data: ', data);
    return data;
  };

  return {
    onGetHelloWorld,
  };
};
