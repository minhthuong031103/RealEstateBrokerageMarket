import React from "react";
import { getSession } from "@/lib/auth";
import { Header } from "@/components/header";
import { redirect } from "next/navigation";
import { Footer } from "@/components/footer";

export default async function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/auth/login");
  return (
    <div className="w-full h-full bg-slate-50">
      <Header session={session} />
      {/* <Header session={session}/> */}
      <div className="flex flex-col lg:flex-row justify-between h-full ">
        <div className="flex-1 w-full h-full min-h-screen bg-slate-50">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
