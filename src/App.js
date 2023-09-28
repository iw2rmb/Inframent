import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeScreen from "./screen/HomeScreen";
import LoginScreen from "./screen/LoginScreen";
function App() {
  // Declaring the routes in the website
  const routes = [
    <Route path="/" element={<HomeScreen />} />,
    <Route path="/login" element={<LoginScreen />} />,
  ];

  const router = createBrowserRouter(createRoutesFromElements(routes));

  return (
    <div className="App">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
