import { Outlet } from "react-router";

export default function DefaultLayout() {
  return (
    <>
      <div>Default Layout</div>
      <Outlet />
    </>
  );
}
