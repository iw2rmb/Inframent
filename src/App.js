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
import Layout from "./layout";
import DpAreas from "./screen/DpAreas";
function App() {
  // Declaring the routes in the website

  const Home = () => (
    <Layout>
      <HomeScreen />
    </Layout>
  )

  const DpArea = () => (
    <Layout>
      <DpAreas />
     </Layout>
  )

  
  const data = sessionStorage.getItem("userInfo");
  const routes = [
    <Route path="/" element={<Home />} />,
    <Route  path="/login" element={<LoginScreen />} />,
    <Route  path="/dp-areas" element={<DpArea />} />,

  //   <Route
  //   path='/'
  //   element={
  //     data ? (
  //       <Home />
  //     ) : (
  //       <LoginScreen />
  //       // <Route path="/login" element={<LoginScreen />} />
  //     )
  //   }
  // />
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
