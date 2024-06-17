import { Route, Routes, useLocation } from "react-router-dom";
// pages
import { Main } from "../pages/Main/Main";
import { AddNewCompany } from "../pages/AddNewCompany/AddNewCompany";
import { AddNewWorker } from "../pages/AddNewWorker/AddNewWorker";
import { Edit } from "../pages/Edit/Edit";

export const Router = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Main />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/newcompany" element={<AddNewCompany />} />
          <Route path="/newworker" element={<AddNewWorker />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      )}
    </>
  );
};
