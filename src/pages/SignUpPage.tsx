import Logo from "@/assets/image/logo-white.png";
import { useEffect, useState } from "react";
import TextField, {
  type TextFiledValidator,
} from "@/components/ui/text-field/TextField.tsx";
import CheckBox from "@/components/ui/CheckBox.tsx";
import { TERM } from "@/lib/constants.ts";
import Button from "@/components/ui/Button.tsx";
import { isValidEmail } from "@/lib/utils.ts";
import { checkEmail, checkNickname, signUp } from "@/api/sign-up.ts";
import { useNavigate } from "react-router";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "@/api/response.type.ts";

type ValidationItem = {
  type: "informative" | "negative" | "primary";
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
  });

  const [email, setEmail] = useState("");
  const [isPassedEmailCheck, setIsPassedEmailCheck] = useState(false);
  const [isEmailDuplicated, setIsEmailDuplicated] = useState<
    boolean | undefined
  >();
  const [nickname, setNickname] = useState("");
  const [isPassedNicknameCheck, setIsPassedNicknameCheck] = useState(false);
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState<
    boolean | undefined
  >();
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [isAgreeTerm, setIsAgreeTerm] = useState(false);

  /** 이메일 **/
  const onEmailActionClick = async () => {
    try {
      const checkResult = await checkEmail(form.email);

      if (checkResult.available) {
        setValidation({
          ...validation,
          email: {
            type: "primary",
            message: "사용 가능한 이메일입니다.",
            status: true,
            checked: true,
            focus: false,
          },
        });
      } else {
        setValidation({
          ...validation,
          email: {
            type: "negative",
            message: checkResult.message,
            status: true,
            checked: true,
            focus: false,
          },
        });
      }
    } catch (e) {
      const axiosError = e as AxiosError;
      const response = axiosError?.response?.data as ErrorResponse;
      setValidation({
        ...validation,
        email: {
          type: "negative",
          message: response.error.message,
          status: true,
          checked: true,
          focus: false,
        },
      });
    }
  };

  useEffect(() => {
    console.log("form.email changed:", form.email);
  }, [form.email]);

  /** 이메일 **/
  const emailValidate: TextFiledValidator = (value: string) => {
    if (isPassedEmailCheck) {
      return { type: "success", message: "사용 가능한 이메일입니다." };
    }
    if (isEmailDuplicated) {
      return { type: "error", message: "이미 사용중인 이메일입니다." };
    }
    if (!value) {
      return { type: "error", message: "이메일 형식으로 작성해 주세요." };
    }
    if (value.trim().length === 0) {
      return { type: "error", message: "이메일 형식으로 작성해 주세요." };
    }
    if (!isValidEmail(value)) {
      return { type: "error", message: "이메일 형식으로 작성해 주세요." };
    }

    return { type: "error", message: "중복을 확인해주세요." };
  };
  useEffect(() => {
    setIsPassedEmailCheck(false);
    setIsEmailDuplicated(undefined);
  }, [email]);

  /** 닉네임 **/
  const onNicknameActionClick = async (value: string) => {
    const checkResult = await checkNickname(value);
    if (checkResult) {
      setIsNicknameDuplicated(false);
      setIsPassedNicknameCheck(true);
    } else {
      setIsNicknameDuplicated(true);
      setIsPassedNicknameCheck(false);
    }
  };
  const nicknameValidate: TextFiledValidator = (value: string) => {
    if (isPassedNicknameCheck) {
      return { type: "success", message: "사용 가능한 닉네임입니다." };
    }
    if (isNicknameDuplicated) {
      return { type: "error", message: "이미 사용중인 닉네임입니다." };
    }
    if (!value) {
      return { type: "error", message: "닉네임을 입력해 주세요." };
    }

    return { type: "error", message: "중복을 확인해주세요." };
  };
  useEffect(() => {
    setIsPassedNicknameCheck(false);
    setIsNicknameDuplicated(undefined);
  }, [nickname]);

  /** 패스워드 **/
  const passwordValidate: TextFiledValidator = (value: string) => {
    if (!value) {
      return {
        type: "error",
        message: "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.",
      };
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
      return {
        type: "error",
        message: "비밀번호는 8자 이상, 영문과 숫자 조합이어야 합니다.",
      };
    }
  };

  /** 패스워드 확인 **/
  const passwordCheckValidate: TextFiledValidator = (value: string) => {
    if (!value) {
      return {
        type: "error",
        message: "비밀번호가 일치하지 않습니다.",
      };
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
      return {
        type: "error",
        message: "비밀번호가 일치하지 않습니다.",
      };
    }

    if (password !== value) {
      return {
        type: "error",
        message: "비밀번호가 일치하지 않습니다.",
      };
    }
  };

  const isAllPassedValidation = () => {
    const passEmail = emailValidate(email)?.type === "success";
    const passNickname = nicknameValidate(nickname)?.type === "success";
    const passPassword = passwordValidate(password) === undefined;
    const passPasswordCheck =
      passwordCheckValidate(passwordCheck) === undefined;
    return (
      passEmail &&
      passNickname &&
      passPassword &&
      passPasswordCheck &&
      isAgreeTerm
    );
  };

  const handleJoinClick = async () => {
    const isAllPass = isAllPassedValidation();
    if (isAllPass) {
      const response = await signUp({
        email,
        nickname,
        password,
        confirmPassword: passwordCheck,
      });

      if (response.success) {
        alert("회원 가입에 성공했습니다.");
        navigate("/sign-in");
      } else {
        const message = response.error?.message;
        alert(message);
      }
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
              >
                <Button
                  variant="primary"
                  className="body-small-s"
                  onClick={onEmailActionClick}
                >
                  중복확인
                </Button>
              </TextField.Input>
              <TextField.HelperText variant={validation.email.type}>
                {validation.email.message}
              </TextField.HelperText>
            </TextField>

            <TextField
              label="아이디"
              placeholder="이메일 주소 형식으로 입력해 주세요."
              type="text"
              width="420px"
              value={email}
              onChange={setEmail}
              action={{
                label: "중복확인",
                onClick: onEmailActionClick,
                disabled: !email,
              }}
              validate={emailValidate}
            />
            <TextField
              label="닉네임"
              placeholder="닉네임을 입력해 주세요."
              type="text"
              width="420px"
              value={nickname}
              onChange={setNickname}
              action={{
                label: "중복확인",
                onClick: onNicknameActionClick,
                disabled: !nickname,
              }}
              validate={nicknameValidate}
            />
            <TextField
              label="비밀번호"
              placeholder="비밀번호를 입력해 주세요."
              type="password"
              width="420px"
              value={password}
              onChange={setPassword}
              validate={passwordValidate}
            />
            <TextField
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해 주세요."
              type="password"
              width="420px"
              value={passwordCheck}
              onChange={setPasswordCheck}
              validate={passwordCheckValidate}
            />
          </div>

          <div className="w-[420px] mt-[60px]">
            <div className="flex justify-between">
              <div className="body-small">이용약관</div>
              <div className="flex gap-[4px]">
                <p
                  className={`body-small ${isAgreeTerm ? "text-primary" : "text-primary-30"}`}
                >
                  동의함
                </p>
                <CheckBox value={isAgreeTerm} onChange={setIsAgreeTerm} />
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
              <Button variant="primary" onClick={handleJoinClick} width="100%">
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
