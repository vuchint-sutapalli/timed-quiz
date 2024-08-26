import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AppLayout from "./Layout/app-layout";
import LandingPage from "./Pages/Landing/index.jsx";
import Login from "./Pages/Login.jsx";
import Protected from "./components/ProtectedWrapper.jsx";
import SignUp from "./Pages/SignUp.jsx";
import TimedQuizInstructions from "./Pages/TimedQuizInstructions";
import TimedQuizPlayer from "./Pages/TimedQuizPlayer";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <Protected authentication={true}>
            <LandingPage />
          </Protected>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/timed-quiz",
        element: (
          <Protected authentication={true}>
            <TimedQuizInstructions />
          </Protected>
        ),
      },

      {
        path: "/play-quiz/:qId",
        element: (
          <Protected authentication={true}>
            <TimedQuizPlayer />
          </Protected>
        ),
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
