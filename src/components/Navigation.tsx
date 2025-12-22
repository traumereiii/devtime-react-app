import Logo from "@/assets/image/logo-main.svg";
import { useNavigate } from "react-router";
import { useUserProfile } from "@/store/user-profile.ts";
import NavigationDropdown from "@/components/NavigationDropdown.tsx";

type MenuItem = {
  label: string;
  path: string;
};

const menuItems: MenuItem[] = [
  { label: "대시보드", path: "/dashboard" },
  { label: "랭킹", path: "/ranking" },
];

export default function Navigation() {
  let navigate = useNavigate();
  let userProfile = useUserProfile();

  const handleMenuItemClick = (menuItem: MenuItem) => {
    navigate(menuItem.path);
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-[48px]">
        <img
          src={Logo}
          alt="로고"
          className="cursor-pointer"
          onClick={() => navigate("/")}
        />
        <div className="flex items-center gap-[38px]">
          {menuItems.map((menuItem, index) => (
            <div
              key={index}
              className="body-s text-indigo cursor-pointer"
              onClick={() => handleMenuItemClick(menuItem)}
            >
              {menuItem.label}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-[12px]">
        <img
          src={userProfile?.profile?.profileImage}
          alt="프로필"
          className="w-[40px] rounded-2xl"
        />

        <NavigationDropdown nickname={userProfile?.nickname} />
      </div>
    </div>
  );
}
