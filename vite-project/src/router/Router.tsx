import { Routes, Route } from "react-router-dom";
import Login from "../components/login/Login";
import Page from "../components/page/Page";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Login />}></Route>
        <Route path="/Dashlayout" element={<Page />}></Route>
      </Routes>
    </div>
  );
};

export default Router;
