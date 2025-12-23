import { Route, Routes } from "react-router";
import IndexPage from "./pages/IndexPage.tsx";
import SignInPage from "./pages/SignInPage.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import TimerPage from "./pages/TimerPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import RankingPage from "./pages/RankingPage.tsx";
import DefaultLayout from "@/components/DefaultLayout.tsx";
import MyPagePage from "@/pages/MyPagePage.tsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path={"/"} element={<IndexPage />} />

        <Route path={"/timer"} element={<TimerPage />} />
        <Route path={"/dashboard"} element={<DashboardPage />} />
        <Route path={"/ranking"} element={<RankingPage />} />
        <Route path={"/my-page"} element={<MyPagePage />} />
      </Route>

      <Route path={"/sign-in"} element={<SignInPage />} />
      <Route path={"/sign-up"} element={<SignUpPage />} />
      <Route path={"/profile"} element={<ProfilePage />} />
    </Routes>
  );
}
