import { ChiTietDoiTac } from "./(components)/ChiTietDoiTac";

export default function page({ params }) {
  return <ChiTietDoiTac id={params.id} />;
}
