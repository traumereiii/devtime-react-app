import Logo from "@/assets/image/logo-blue.png";
import SymbolLogo from "@/assets/image/symbol-logo.png";
import Button from "@/components/ui/Button.tsx";
import TextField, {
  type TextFiledValidator,
} from "@/components/ui/text-field/TextField.tsx";
import { useState } from "react";
import { useNavigate } from "react-router";
import { isValidEmail } from "@/lib/utils.ts";
import { login } from "@/api/auth.ts";
import { useCloseDialog, useOpenDialog } from "@/store/dialog.ts";
import { useAuthStore } from "@/store/auth.ts";

export default function SignInPage() {
  const navigate = useNavigate();
  const openDialog = useOpenDialog();
  const closeDialog = useCloseDialog();
  const authStore = useAuthStore();

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpClick = () => navigate("/sign-up");

  const accountValidate: TextFiledValidator = (value: string) => {
    if (!value || value.trim().length === 0) {
      return;
    }
    if (!isValidEmail(value)) {
      return { type: "error", message: "이메일 형식으로 작성해 주세요." };
    }
  };

  const passwordValidate: TextFiledValidator = (value: string) => {
    if (!value) {
      return;
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
      return {
        type: "error",
        message: "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.",
      };
    }
  };

  const canSubmit = !!account && !!password;

  const handleLoginClick = async () => {
    const loginResponse = await login({ email: account, password: password });
    console.log("check: ", loginResponse);
    if (!loginResponse.success) {
      openDialog({
        title: "로그인 정보를 다시 확인해 주세요",
        onPositive: {
          label: "확인",
          onClick: () => {
            closeDialog();
          },
        },
      });
      return;
    }

    // TOKEN_HOLDER.accessToken = loginResponse.accessToken;
    // TOKEN_HOLDER.refreshToken = loginResponse.refreshToken;
    authStore.actions.setToken(
      loginResponse.accessToken,
      loginResponse.refreshToken,
    );

    if (loginResponse.isDuplicateLogin) {
      openDialog({
        title: "중복 로그인이 불가능합니다.",
        body: "다른 기기에 중복 로그인 된 상태입니다. [확인] 버튼을 누르면 다른 기기에서 강제 로그아웃되며, 진행중이던 타이머가 있다면 기록이 자동 삭제 됩니다.",
        onPositive: {
          label: "확인",
          onClick: async () => {
            //TODO 로그아웃 호출
            closeDialog();
          },
        },
      });
      return;
    }
    navigate("/");
  };

  return (
    <>
      <img
        src={SymbolLogo}
        alt="로고"
        className="w-[1090px] absolute top-[486px] right-[-190px]"
      />
      <div className="flex justify-center items-center h-[100vh]">
        <div
          className="w-[500px] h-[598px]
                     flex flex-col justify-center items-center gap-[48px]
                     bg-[rgba(255,255,255, 0.5)] backdrop-blur-[50px] shadow-[0px_40px_100px_40px_rgba(3,104,255,0.05)]"
        >
          <div>
            <img src={Logo} alt="로고" className="w-[132px]" />
          </div>
          <div className="flex flex-col gap-[36px]">
            <TextField
              label="아이디"
              type="text"
              value={account}
              onChange={(value) => setAccount(value)}
              validate={accountValidate}
              placeholder="이메일 주소를 입력해 주세요."
              width="328px"
            />
            <TextField
              label="비밀번호"
              type="password"
              value={password}
              onChange={(value) => setPassword(value)}
              validate={passwordValidate}
              placeholder="비밀번호를 입력해 주세요."
              width="328px"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-[24px]">
            <div className="w-[328px]">
              <Button
                variant="primary"
                disabled={!canSubmit}
                width="100%"
                onClick={handleLoginClick}
              >
                로그인
              </Button>
            </div>
            <p
              className="text-primary body-small cursor-pointer"
              onClick={handleSignUpClick}
            >
              회원가입
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
// backdrop-filter: blur(50px)
//
// box-shadow: 0px 40px 100px 40px rgba(3, 104, 255, 0.05);
