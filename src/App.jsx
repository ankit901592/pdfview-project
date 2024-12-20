import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import Navbar from "./Components/Navbar";
import DetailedView from "./pages/DetailedView/DetailedView";
import { store } from "./redux/store";
import Home from "./pages/Home/Home";
import { Navigate } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        { path: "home", element: <Home /> },
        { path: "/home/DetailedView/:id", element: <DetailedView /> },
        { index: true, element: <Navigate to="home" replace /> }, // Redirect to "/home"
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
