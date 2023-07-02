import MainNav from "@/components/main-nav";
import { UserButton, auth } from "@clerk/nextjs";
import StoreSwitcher from "./modals/store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

interface NavbarProps {}

export default async function Navbar(props: NavbarProps) {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
