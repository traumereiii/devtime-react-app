import { useNavigate } from "react-router";
import { useState } from "react";
import TextField, {
  type TextFiledValidator,
} from "@/components/ui/TextField.tsx";
import Logo from "@/assets/image/logo-white.png";
import Dropdown from "@/components/ui/Dropdown.tsx";
import Autocomplete from "@/components/ui/Autocomplete.tsx";
import Chip from "@/components/ui/Chip.tsx";
import AddImage from "@/components/ui/AddImage.tsx";
import Button from "@/components/ui/Button.tsx";
import { fileToBase64 } from "@/lib/utils.ts";
import { updateProfile } from "@/api/profile.ts";

export default function ProfilePage() {
  const navigate = useNavigate();

  const [career, setCareer] = useState("");
  const [purpose, setPurpose] = useState("");
  const [purposeSelf, setPurposeSelf] = useState("");
  const [goal, setGoal] = useState("");
  const [techStacks, setTechStacks] = useState<string[]>([]);
  const [profile, setProfile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState("");

  /****/
  const purposeSelfValidate: TextFiledValidator = (value: string) => {
    if (value.length > 0 && value.trim().length === 0) {
      return {
        type: "error",
        message: "공부의 목적을 입력해 주세요.",
      };
    }
  };

  const goalValidate: TextFiledValidator = (value: string) => {
    if (value.length > 0 && value.trim().length === 0) {
      return {
        type: "error",
        message: "공부 목표를 입력해 주세요.",
      };
    }
  };

  const handleProfileChange = async (file: File | null) => {
    if (!file) {
      setProfile(null);
      setProfileImage("");
      return;
    }
    setProfile(file);
    setProfileImage(await fileToBase64(file));
  };

  const handleSkipClick = () => {
    navigate("/");
  };

  const handleSaveClick = async () => {
    console.log(career, purpose, goal, techStacks, profileImage);

    await updateProfile({});
  };

  const canSubmit = career && purpose && goal && techStacks.length > 0;

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
          <div className="text-primary heading-b text-center">프로필 설정</div>

          <div className="flex flex-col gap-[40px] mt-[36px]">
            <Dropdown<string>
              label="개발 경력"
              placeholder="개발 경력을 선택해 주세요."
              items={[
                { label: "경력없음", value: "경력없음" },
                { label: "0 - 3년", value: "0 - 3년" },
                { label: "4 - 7년", value: "4 - 7년" },
                { label: "8 - 10년", value: "8 - 10년" },
                { label: "11년 이상", value: "11년 이상" },
              ]}
              onChange={setCareer}
            />
            <Dropdown<string>
              label="공부 목적"
              placeholder="공부의 목적을 선택해 주세요."
              items={[
                { label: "취업 준비", value: "취업 준비" },
                { label: "이직 준비", value: "이직 준비" },
                { label: "단순 개발 역량 향상", value: "단순 개발 역량 향상" },
                {
                  label: "회사 내 프로젝트 원활하게 수행",
                  value: "회사 내 프로젝트 원활하게 수행",
                },
                { label: "기타(직접 입력)", value: "기타(직접 입력)" },
              ]}
              onChange={setPurpose}
            />
            {purpose === "기타(직접 입력)" && (
              <TextField
                placeholder=""
                type="text"
                width="420px"
                value={purposeSelf}
                onChange={setPurposeSelf}
                validate={purposeSelfValidate}
              />
            )}

            <TextField
              label="공부 목표"
              placeholder="공부 목표를 입력해 주세요."
              type="text"
              width="420px"
              value={goal}
              onChange={setGoal}
              validate={goalValidate}
            />

            <div className="flex flex-col gap-[8px]">
              <Autocomplete
                label="공부/사용 중인 기술 스택"
                values={techStacks}
                onComplete={(techStack) =>
                  setTechStacks([...techStacks, techStack])
                }
              />
              <div className="flex gap-[8px]">
                {techStacks.map((techStack, index) => (
                  <Chip
                    key={index}
                    label={techStack}
                    onDelete={() =>
                      setTechStacks(techStacks.filter((it) => it !== techStack))
                    }
                  />
                ))}
              </div>
            </div>

            <AddImage
              label="프로필 이미지"
              file={profile}
              onChange={handleProfileChange}
            />
          </div>

          <div className="w-full mt-[36px]">
            <Button
              variant="primary"
              width="100%"
              disabled={!canSubmit}
              onClick={handleSaveClick}
            >
              저장하기
            </Button>
          </div>

          <p className="mt-[24px] flex justify-center text-primary body gap-[12px]">
            다음에 하시겠어요?
            <span className="body-b cursor-pointer" onClick={handleSkipClick}>
              {" "}
              건너뛰기
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
