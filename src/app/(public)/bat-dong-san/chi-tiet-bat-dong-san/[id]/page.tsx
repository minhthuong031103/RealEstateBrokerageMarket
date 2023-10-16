import { ChiTietComponent } from "./components/ChiTietComponent";

export default function page({ params }) {
  return <ChiTietComponent id={params.id} />;
}
