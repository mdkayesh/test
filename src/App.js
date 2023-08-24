import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";
import RootLayout from "./RootLayout/RootLayout";
import Login from "./pages/Login";
import Info from "./pages/Info";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/info" element={<Info />} />
        </Route>
        <Route path="/logIn" element={<Login />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
