import { Outlet } from "react-router";
import Navigation from "@/components/Navigation.tsx";

export default function DefaultLayout() {
  return (
    <div className="bg-[linear-gradient(180deg,#F6F7F9_0%,#E9ECF5_100%)] py-[18px] h-screen">
      <div className="w-[1200px] m-auto">
        <Navigation />
        <Outlet />
      </div>
    </div>
  );
}
