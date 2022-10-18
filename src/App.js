import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Components/registration.jsx";
import HomePage from "./Components/home";
import SignIn from "Components/singin";
import User from "Components/user";

function App() {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <SignIn />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <User />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
