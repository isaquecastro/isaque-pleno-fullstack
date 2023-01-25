import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/index.css";

import { AuthProvider } from "./contexts/auth";
import Routes from "./routes";

const App = () => (
  <>
    <AuthProvider>
      <ToastContainer />
      <Routes />
    </AuthProvider>
  </>
);

export default App;
