import { ChiTietComponent } from "./components/(detail)/ChiTietComponent";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page({ params }) {
  const session = await getSession();
  if (!session) redirect("/auth/login");
  return <ChiTietComponent id={params.id} />;
}
