import Logo from "@/assets/image/logo-white.png";
import { useEffect, useState } from "react";
import TextField from "@/components/ui/text-field/TextField.tsx";
import CheckBox from "@/components/ui/CheckBox.tsx";
import { EMAIL_REG_EXP, PASSWORD_REG_EXP, TERM } from "@/lib/constants.ts";
import Button from "@/components/ui/Button.tsx";
import { checkEmail, checkNickname, signUp } from "@/api/sign-up.ts";
import { useNavigate } from "react-router";
import { isAxiosError } from "axios";
import type { ErrorResponse } from "@/api/response.type.ts";

type ValidationItem = {
  type: "informative" | "positive" | "negative";
  message: string;
  status: boolean;
  checked: boolean;
  focus: boolean;
};

type ValidationState = Record<string, ValidationItem>;

export default function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
    agree: false,
  });

  const [validation, setValidation] = useState<ValidationState>({
    email: {
      type: "informative",
      message: "",
      status: false,
      checked: false,
      focus: false,
    },
    nickname: {
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
    passwordConfirm: {
      type: "informative",
      message: "",
      status: false,
      checked: false,
      focus: false,
    },
  });

  const canSubmit =
    Object.values(validation).find((it) => !it.status) === undefined &&
    form.agree;

  /** 이메일 **/
  const onEmailCheckClick = async () => {
    try {
      const checkResult = await checkEmail(form.email);

      setValidation((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          type: checkResult.available ? "positive" : "negative",
          message: checkResult.message,
          status: checkResult.available,
          checked: checkResult.available,
        },
      }));
    } catch (e) {
      if (isAxiosError(e)) {
        const response = e.response?.data as ErrorResponse;
        setValidation((prev) => ({
          ...prev,
          email: {
            ...prev.email,
            type: "negative",
            message: response.error.message,
            status: false,
            checked: true,
          },
        }));
      }
    }
  };
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
      return;
    }

    if (!validation.email.checked) {
      setValidation((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          type: "negative",
          message: "중복을 확인해 주세요.",
        },
      }));
      return;
    }
  }, [form.email]);

  /** 닉네임 **/
  const onNicknameCheckClick = async () => {
    try {
      const checkResult = await checkNickname(form.nickname);

      setValidation((prev) => ({
        ...prev,
        nickname: {
          ...prev.nickname,
          type: checkResult.available ? "positive" : "negative",
          message: checkResult.message,
          status: checkResult.available,
          checked: checkResult.available,
        },
      }));
    } catch (e) {
      if (isAxiosError(e)) {
        const response = e.response?.data as ErrorResponse;
        setValidation((prev) => ({
          ...prev,
          nickname: {
            ...prev.nickname,
            type: "negative",
            message: response.error.message,
            status: false,
            checked: true,
          },
        }));
      }
    }
  };

  useEffect(() => {
    if (!form.nickname) {
      setValidation((prev) => ({
        ...prev,
        nickname: {
          ...prev.nickname,
          type: "informative",
          message: "",
          status: false,
        },
      }));
      return;
    }

    if (!validation.nickname.checked) {
      setValidation((prev) => ({
        ...prev,
        nickname: {
          ...prev.nickname,
          type: "negative",
          message: "중복을 확인해 주세요.",
          status: false,
        },
      }));
      return;
    }
  }, [form.nickname]);

  /** 비밀번호 **/
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

  /** 비밀번호 확인 **/
  useEffect(() => {
    if (!form.passwordConfirm) {
      setValidation((prev) => ({
        ...prev,
        passwordConfirm: {
          ...prev.passwordConfirm,
          type: "informative",
          message: "",
          status: false,
        },
      }));
      return;
    }

    if (form.password !== form.passwordConfirm) {
      setValidation((prev) => ({
        ...prev,
        passwordConfirm: {
          ...prev.passwordConfirm,
          type: "negative",
          message: "비밀번호가 일치하지 않습니다.",
          status: false,
        },
      }));
    } else {
      setValidation((prev) => ({
        ...prev,
        passwordConfirm: {
          ...prev.passwordConfirm,
          type: "informative",
          message: "",
          status: true,
        },
      }));
    }
  }, [form.passwordConfirm]);

  const handleJoinClick = async () => {
    const response = await signUp({
      email: form.email,
      nickname: form.nickname,
      password: form.password,
      confirmPassword: form.passwordConfirm,
    });

    if (response.success) {
      alert("회원 가입에 성공했습니다.");
      navigate("/sign-in");
    } else {
      const message = response.error?.message;
      alert(message);
    }
  };

  const handleLoginClick = () => {
    navigate("/sign-in");
  };

  return (
    <div className="flex">
      <div className="flex-1 h-[100vh] bg-primary">
        <div className="flex justify-center items-center h-[100vh]">
          <div className="flex flex-col gap-[36px]">
            <img src={Logo} alt="로고" className="w-[264px]" />
            <p className="title text-white text-center">개발자를 위한 타이머</p>
          </div>
        </div>
      </div>
      <div className="flex-1 h-[100vh] flex justify-center items-center">
        <div className="flex flex-col">
          <div className="text-primary heading-b text-center">회원가입</div>

          <div className="flex flex-col gap-[40px] mt-[36px] w-[420px]">
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
              >
                <Button
                  variant="primary"
                  className="body-small-s"
                  onClick={onEmailCheckClick}
                >
                  중복확인
                </Button>
              </TextField.Input>
              <TextField.HelperText variant={validation.email.type}>
                {validation.email.message}
              </TextField.HelperText>
            </TextField>

            <TextField
              value={form.nickname}
              setValue={(value) => setForm({ ...form, nickname: value })}
            >
              <TextField.Label>닉네임</TextField.Label>
              <TextField.Input
                placeholder="닉네임을 입력해 주세요."
                type="text"
                className="gap-4"
              >
                <Button
                  variant="primary"
                  className="body-small-s"
                  onClick={onNicknameCheckClick}
                >
                  중복확인
                </Button>
              </TextField.Input>
              <TextField.HelperText variant={validation.nickname.type}>
                {validation.nickname.message}
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

            <TextField
              value={form.passwordConfirm}
              setValue={(value) => setForm({ ...form, passwordConfirm: value })}
            >
              <TextField.Label>비밀번호 확인</TextField.Label>
              <TextField.Input
                placeholder="비밀번호를 다시 입력해 주세요."
                type="password"
              />
              <TextField.HelperText variant={validation.passwordConfirm.type}>
                {validation.passwordConfirm.message}
              </TextField.HelperText>
            </TextField>
          </div>

          <div className="w-[420px] mt-[60px]">
            <div className="flex justify-between">
              <div className="body-small">이용약관</div>
              <div className="flex gap-[4px]">
                <p
                  className={`body-small ${form.agree ? "text-primary" : "text-primary-30"}`}
                >
                  동의함
                </p>
                <CheckBox
                  value={form.agree}
                  onChange={(value) =>
                    setForm((prev) => ({ ...prev, agree: value }))
                  }
                />
              </div>
            </div>
            <div
              className="
              bg-[var(--grey-50)] w-full h-[110px] mt-[8px]
              px-[16px] py-[12px]
              text-[var(--grey-600)]
              overflow-y-auto
              flex flex-col gap-[16px]
              [-ms-overflow-style:none]      /* IE/Edge */
              [scrollbar-width:none]         /* Firefox */
              [&::-webkit-scrollbar]:hidden  /* Webkit */
              "
              dangerouslySetInnerHTML={{ __html: TERM }}
            ></div>
            <div className="mt-[36px]">
              <Button
                variant="primary"
                onClick={handleJoinClick}
                width="100%"
                className="sub-title-s"
                disabled={!canSubmit}
              >
                회원가입
              </Button>
            </div>
            <div className="flex justify-center gap-[12px] mt-[24px]">
              <div className="body-r text-primary">회원이신가요?</div>
              <div
                className="body-b text-primary cursor-pointer"
                onClick={handleLoginClick}
              >
                로그인 바로가기
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
