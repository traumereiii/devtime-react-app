import { useUserProfile } from "@/store/user-profile.ts";
import Edit from "@/assets/icon/edit.svg";
import NoImage from "@/assets/image/no-image.jpg";

export default function MyPagePage() {
  const userProfile = useUserProfile();

  if (!userProfile) return null;

  return (
    <div className="mt-[40px] w-[1200px] px-[36px] py-[36px] rounded-[12px] bg-white">
      <div className="flex gap-[56px]">
        <img
          src={
            userProfile.profile?.profileImage
              ? userProfile.profile.profileImage
              : NoImage
          }
          alt="프로필"
          className="w-[160px] h-[160px] rounded-[12px]"
        />
        <div className="flex-1">
          <div>
            <div className="sub-title text-indigo mb-[4px]">
              {userProfile.nickname}
            </div>
            {userProfile.profile?.goal ? (
              <div className="heading-b text-indigo">
                {userProfile.profile?.goal}
              </div>
            ) : (
              <div className="heading-b text-[var(--grey-300)]">
                아직 설정한 목표가 없어요.
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[24px] mt-[48px]">
            <div className="flex flex-col gap-[4px]">
              <div className="body-small-s text-[var(--grey-400)]">
                이메일 주소
              </div>
              <div className="sub-title-s">{userProfile.email}</div>
            </div>
            <div className="flex flex-col gap-[4px]">
              <div className="body-small-s text-[var(--grey-400)]">
                개발 경력
              </div>
              {userProfile.profile ? (
                <div className="sub-title-s">{userProfile.profile.career}</div>
              ) : (
                <div className="sub-title-s text-[var(--grey-400)]">
                  개발 경력을 업데이트 해주세요.
                </div>
              )}
            </div>
            <div className="flex flex-col gap-[4px]">
              <div className="body-small-s text-[var(--grey-400)]">
                공부 목적
              </div>
              {userProfile.profile ? (
                <div className="sub-title-s">{userProfile.profile.purpose}</div>
              ) : (
                <div className="sub-title-s text-[var(--grey-400)]">
                  공부 목적을 업데이트 해주세요.
                </div>
              )}
            </div>
            <div className="flex flex-col gap-[4px]">
              <div className="body-small-s text-[var(--grey-400)]">
                기술 스택
              </div>
              <div className="flex">
                {userProfile.profile ? (
                  userProfile.profile?.techStacks.map((techstack) => (
                    <div className="px-[8px] py-[4px] rounded-[5px] bg-[var(--grey-100)] body text-[var(--grey-500)]">
                      {techstack}
                    </div>
                  ))
                ) : (
                  <div className="sub-title-s text-[var(--grey-400)]">
                    현재 공부 중인 또는 가지고 있는 개발 스택을 업데이트
                    해주세요.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[110px]">
          <div className="flex gap-[8px] cursor-pointer">
            <img src={Edit} alt="회원정보 수정" className="w-[24px]" />
            <div className="caption text-[var(--grey-500)]">회원정보 수정</div>
          </div>
        </div>
      </div>
    </div>
  );
}
