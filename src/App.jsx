import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./Layout/app-layout";
import LandingPage from "./Pages/Landing/index.jsx";
import Login from "./Pages/Login.jsx";
import Protected from "./components/ProtectedWrapper.jsx";
import SignUp from "./Pages/SignUp.jsx";
import TimedQuiz from "./Pages/TimedQuiz";
import authService from "./appWrite/auth.js";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/timed-quiz",
        element: <TimedQuiz />,
      },

      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <SignUp />
          </Protected>
        ),
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
