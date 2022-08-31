import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserNavigation from "../navigation/user-navigation";
import { Error404 } from "../index";

import { Header, LayoutSetting, LeftSideBar, RightSideBar } from "./index";

const MasterLayout = () => {
  return (
    <BrowserRouter>
      <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
          {/* <LayoutSetting /> */}
          <RightSideBar />
          <LeftSideBar />
          <div className="main-panel">
            {/* navigation route for admin users-----------*/}
            <UserNavigation />
            {/* ---------------------------------------- */}
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};
export default MasterLayout;
