import Logo from "@/assets/image/logo-blue.png";
import SymbolLogo from "@/assets/image/symbol-logo.png";
import Button from "@/components/ui/Button.tsx";
import TextField from "@/components/ui/text-field/TextField.tsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCloseDialog, useOpenDialog } from "@/store/dialog.ts";
import { useAuthStore } from "@/store/auth.ts";
import { EMAIL_REG_EXP, PASSWORD_REG_EXP } from "@/lib/constants.ts";
import type { ValidationState } from "@/types.ts";
import { useLogin } from "@/hooks/mutations/use-login.ts";
import { isAxiosError } from "axios";
import type { ErrorResponse } from "@/api/response.type.ts";

export default function SignInPage() {
  const navigate = useNavigate();
  const openDialog = useOpenDialog();
  const closeDialog = useCloseDialog();
  const authStore = useAuthStore();
  let { mutate: login } = useLogin({
    onSuccess: (loginResponse) => {
      console.log("onSuccess: ", loginResponse);
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
    },
    onError: (error: Error) => {
      if (isAxiosError(error)) {
        const errorResponse = error.response?.data as ErrorResponse;
        openDialog({
          title: "로그인 실패",
          body: errorResponse.error.message,
          onPositive: {
            label: "확인",
            onClick: async () => {
              //TODO 로그아웃 호출
              closeDialog();
            },
          },
        });
      }
    },
  });

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [validation, setValidation] = useState<ValidationState>({
    email: {
      type: "informative",
      message: "",
      status: false,
      checked: false,
      focus: false,
    },
    password: {
      type: "informative",
      message: "",
      status: false,
      checked: false,
      focus: false,
    },
  });
  const canSubmit = validation.email.status && validation.password.status;

  useEffect(() => {
    if (!form.email) {
      setValidation((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          type: "informative",
          message: "",
        },
      }));
      return;
    }
    if (!EMAIL_REG_EXP.test(form.email)) {
      setValidation((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          type: "negative",
          message: "이메일 형식으로 작성해 주세요.",
        },
      }));
    } else {
      setValidation((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          type: "informative",
          message: "",
          status: true,
        },
      }));
    }
  }, [form.email]);

  useEffect(() => {
    if (!form.password) {
      setValidation((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          type: "informative",
          message: "",
          status: false,
        },
      }));
      return;
    }

    if (!PASSWORD_REG_EXP.test(form.password)) {
      setValidation((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          type: "negative",
          message: "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.",
          status: false,
        },
      }));
    } else {
      setValidation((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          type: "informative",
          message: "",
          status: true,
        },
      }));
    }
  }, [form.password]);

  const handleSignUpClick = () => navigate("/sign-up");

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
              value={form.email}
              setValue={(value) => setForm({ ...form, email: value })}
            >
              <TextField.Label>이메일</TextField.Label>
              <TextField.Input
                placeholder="이메일 주소 형식으로 입력해 주세요."
                type="text"
                className="gap-4"
                onFocus={() =>
                  setValidation((prev) => ({
                    ...prev,
                    email: { ...prev.email, focus: true },
                  }))
                }
              />
              <TextField.HelperText variant={validation.email.type}>
                {validation.email.message}
              </TextField.HelperText>
            </TextField>
            <TextField
              value={form.password}
              setValue={(value) => setForm({ ...form, password: value })}
            >
              <TextField.Label>비밀번호</TextField.Label>
              <TextField.Input
                placeholder="비밀번호를 입력해 주세요."
                type="password"
              />
              <TextField.HelperText variant={validation.password.type}>
                {validation.password.message}
              </TextField.HelperText>
            </TextField>
            <div className="flex flex-col justify-center items-center gap-[24px]">
              <div className="w-[328px]">
                <Button
                  variant="primary"
                  disabled={!canSubmit}
                  width="100%"
                  onClick={() => login(form)}
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
      </div>
    </>
  );
}
