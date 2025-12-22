import { useState } from "react";
import Profile from "@/assets/icon/profile.svg";
import Logout from "@/assets/icon/logout.svg";
import { useNavigate } from "react-router";
import { useAuthStore } from "@/store/auth.ts";

interface NavigationDropdownProps {
  nickname?: string;
}

export default function NavigationDropdown({
  nickname,
}: NavigationDropdownProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  let authStore = useAuthStore();

  // 바깥 클릭하면 닫기

  const handleNicknameClick = () => {
    setOpen((prev) => !prev);
  };

  const handleMyPageClick = () => navigate("/my-page");
  const handleLogoutClick = () => {
    authStore.actions.logout();
    navigate("/sign-in");
  };

  return (
    <div className="relative">
      <div
        className="body-b text-indigo cursor-pointer"
        onClick={handleNicknameClick}
      >
        {nickname || "Nickname"}
      </div>
      {open && (
        <div
          className="
          absolute top-[24px]
          bg-white
          w-[130px]
          px-[12px] py-[16px]
          flex flex-col

        "
        >
          <div
            className="flex gap-[16px] cursor-pointer"
            onClick={handleMyPageClick}
          >
            <img
              src={Profile}
              alt="마이페이지"
              className="w-[17.25px] text-[var(--grey-600)]"
            />
            <div className="body-small">마이페이지</div>
          </div>
          <hr className="my-[16px]" />
          <div
            className="flex gap-[16px] cursor-pointer"
            onClick={handleLogoutClick}
          >
            <img
              src={Logout}
              alt="로그아웃"
              className="w-[17.25px] text-[var(--grey-600)]"
            />
            <div className="body-small">로그아웃</div>
          </div>
        </div>
      )}
    </div>
  );
}
