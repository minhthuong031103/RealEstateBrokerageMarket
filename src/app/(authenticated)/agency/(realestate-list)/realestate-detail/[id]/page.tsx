import { ChiTietComponent } from "./components/(detail)/ChiTietComponent";

export default function page({ params }) {
  return <ChiTietComponent id={params.id} />;
}
