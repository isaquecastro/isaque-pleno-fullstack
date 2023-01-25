import {
  BrowserRouter,
  Navigate,
  Route,
  Routes as RoutesWrap,
} from "react-router-dom";
import Friends from "../pages/Friends";
import Login from "../pages/Login";

const Change = () => {
  return (
    <BrowserRouter>
      <RoutesWrap>
        <Route path="/login" element={<Login />} />

        <Route path="/amigos" element={<Friends />} />

        <Route path="*" element={<Navigate to="/amigos" replace={true} />} />
      </RoutesWrap>
    </BrowserRouter>
  );
};

export default Change;
