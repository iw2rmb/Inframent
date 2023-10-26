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
import Projects from "./components/projects";
import SubProject from "./components/SubProject";
import DpArea from "./components/DpArea";
import MapScreen from "./screen/MapScreen";

function App() {

  const DpAreaa = () => (
    <Layout>
      <DpAreas />
    </Layout>
  );
  const routes = [
    <Route path="/" element={<Layout></Layout>} />,
    <Route path="/login" element={<LoginScreen />} />,
    <Route path="/map" element={<Layout ><MapScreen /></Layout>} />,
  <Route path="/projects/:projectId/:subprojectId/:dpAreaId" element={<DpAreaa />} />,
    <Route
      path="/projects"
      element={
        <Layout>
          <HomeScreen>
            <Projects />
          </HomeScreen>
        </Layout>
      }
    />,
    <Route
      path="/projects/:projectId"
      element={
        <Layout>
          <HomeScreen>
            <Projects />
            <SubProject />
          </HomeScreen>
        </Layout>
      }
    />,
    <Route
      path="/projects/:projectId/:subprojectId"
      element={
        <Layout>
          <HomeScreen>
            <Projects />
            <SubProject />
            <DpArea />
          </HomeScreen>
        </Layout>
      }
    />,
  ];

  const router = createBrowserRouter(createRoutesFromElements(routes));

  return (
    <div className="App overflow-x-hidden">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
