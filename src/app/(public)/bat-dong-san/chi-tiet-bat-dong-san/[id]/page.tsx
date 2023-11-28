import { getSession } from "@/lib/auth";
import { ChiTietComponent } from "./(components)/ChiTietComponent";

export default async function page({ params }) {
  const session = await getSession();

  return <ChiTietComponent id={params.id} session={session} />;
}
