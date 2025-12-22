import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import TextField from "@/components/ui/text-field/TextField.tsx";
import Logo from "@/assets/image/logo-white.png";
import Dropdown from "@/components/ui/Dropdown.tsx";
import Autocomplete from "@/components/ui/Autocomplete.tsx";
import Chip from "@/components/ui/Chip.tsx";
import AddImage from "@/components/ui/AddImage.tsx";
import Button from "@/components/ui/Button.tsx";
import { fileToBase64 } from "@/lib/utils.ts";
import { useDebounce } from "@/hooks/use-debounce.ts";
import { createTechStacks, fetchTechStacks } from "@/api/tech-stacks.ts";
import { useCloseDialog, useOpenDialog } from "@/store/dialog.ts";
import { createProfile } from "@/api/profile.ts";
import type { ValidationState } from "@/types.ts";

export default function ProfilePage() {
  const navigate = useNavigate();
  const openDialog = useOpenDialog();
  const closeDialog = useCloseDialog();

  const [form, setForm] = useState<{
    career: string;
    purpose: string;
    goal: string;
    techStacks: string[];
    profileImage: string;
  }>({
    career: "",
    purpose: "",
    goal: "",
    techStacks: [],
    profileImage: "",
  });
  const [validation, setValidation] = useState<ValidationState>({
    purpose: {
      type: "informative",
      message: "",
      status: false,
      checked: false,
      focus: false,
    },
    goal: {
      type: "informative",
      message: "",
      status: false,
      checked: false,
      focus: false,
    },
  });

  const [showPurposeSelf, setShowPurposeSelf] = useState(false);
  const [techStackSearch, setTechStackSearch] = useState("");
  const debouncedSearch = useDebounce(techStackSearch, 200);
  const [techStackSearchResults, setTechStackSearchResults] = useState<
    string[]
  >([]);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const canSubmit =
    form.career && form.purpose && form.goal && form.techStacks.length > 0;

  useEffect(() => {
    if (debouncedSearch) {
      fetchTechStacks(debouncedSearch).then(({ results }) => {
        setTechStackSearchResults(results.map((it) => it.name));
      });
    } else {
      setTechStackSearchResults([]);
    }
  }, [debouncedSearch]);

  const handleAutoCompleteComplete = async (techStack: string) => {
    setForm((prev) => ({
      ...prev,
      techStacks: [...prev.techStacks, techStack],
    }));

    if (techStackSearchResults.length === 0) {
      await createTechStacks(techStack);
    }
  };

  const handleProfileImageChange = async (file: File | null) => {
    if (!file) {
      setProfileImage(null);
      setForm((prev) => ({ ...prev, profileImage: "" }));

      return;
    }
    setProfileImage(file);
    const base64Image = await fileToBase64(file);
    setForm((prev) => ({ ...prev, profileImage: base64Image }));
  };

  const handleSaveClick = async () => {
    const response = await createProfile(form);

    openDialog({
      title: response.message!,
      onPositive: {
        label: "확인",
        onClick: () => {
          navigate("/");
          closeDialog();
        },
      },
    });
  };

  const handleSkipClick = () => {
    openDialog({
      title: "프로필 설정을 건너뛸까요?",
      body: "프로필을 설정하지 않을 경우 일부 기능 사용에 제한이 생길 수 있습니다. 그래도 프로필 설정을 건너뛰시겠습니까?",
      onPositive: {
        label: "계속 설정하기",
        onClick: () => {
          closeDialog();
        },
      },
      onNegative: {
        label: "건너뛰기",
        onClick: () => {
          navigate("/");
          closeDialog();
        },
      },
    });
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
          <div className="text-primary heading-b text-center">프로필 설정</div>

          <div className="flex flex-col gap-[40px] mt-[36px] w-[420px]">
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
              onChange={(value) =>
                setForm((prev) => ({ ...prev, career: value }))
              }
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
              onChange={(value) => {
                if (value !== "기타(직접 입력)") {
                  setForm((prev) => ({ ...prev, purpose: value }));
                  setShowPurposeSelf(false);
                } else {
                  setForm((prev) => ({ ...prev, purpose: "" }));
                  setShowPurposeSelf(true);
                }
              }}
            />
            {showPurposeSelf && (
              <TextField
                value={form.purpose}
                setValue={(value) => setForm({ ...form, purpose: value })}
              >
                <TextField.Input
                  placeholder="공부 목적을 입력해 주세요."
                  type="text"
                  onFocus={() =>
                    setValidation((prev) => ({
                      ...prev,
                      purpose: { ...prev.purpose, focus: true },
                    }))
                  }
                />
              </TextField>
            )}

            <TextField
              value={form.goal}
              setValue={(value) => setForm({ ...form, goal: value })}
            >
              <TextField.Label>공부 목표</TextField.Label>
              <TextField.Input
                placeholder="공부 목표를 입력해 주세요."
                type="text"
                onFocus={() =>
                  setValidation((prev) => ({
                    ...prev,
                    goal: { ...prev.goal, focus: true },
                  }))
                }
              />
              <TextField.HelperText variant={validation.goal.type}>
                {validation.goal.message}
              </TextField.HelperText>
            </TextField>

            <div className="flex flex-col gap-[8px]">
              <Autocomplete
                label="공부/사용 중인 기술 스택"
                search={techStackSearch}
                onSearchChange={setTechStackSearch}
                values={techStackSearchResults}
                onComplete={handleAutoCompleteComplete}
              />
              <div className="flex gap-[8px] flex-wrap">
                {form.techStacks.map((techStack, index) => (
                  <Chip
                    key={index}
                    label={techStack}
                    onDelete={() =>
                      setForm((prev) => ({
                        ...prev,
                        techStacks: prev.techStacks.filter(
                          (it) => it !== techStack,
                        ),
                      }))
                    }
                  />
                ))}
              </div>
            </div>

            <AddImage
              label="프로필 이미지"
              file={profileImage}
              onChange={handleProfileImageChange}
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
