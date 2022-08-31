// import UserNavigation from "./navigation/user-navigation";
import { Login } from "./pages";
import MasterLayout from "./layout/master-layout";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
// import socket from "./utils/shoket/socket";

function App() {
  const { login } = useSelector((state) => state.users);

  return login ? <MasterLayout /> : <Login />;
}

export default App;
