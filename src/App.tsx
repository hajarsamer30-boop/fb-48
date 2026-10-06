import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import Feed from "./features/Feed/Feed";
import { CounterContextProvider } from "./context/counter.context";
import Profile from "./features/Profile/Profile";
import ProtectedRoute from "./middleware/ProtectedRoute";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import PostDetails from "./features/postDetails/PostDetails";
import MainRouting from "./middleware/MainRouting";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading";
const Notification = lazy(() => import('./features/Notification/Notification'));


export default function App() {
  const routes = createHashRouter([
    { path: "/", element: <MainRouting><Home></Home></MainRouting> },
    {
      element: <Layout></Layout>,
      children: [
        {
          path: "/feed",
          element: (
            <ProtectedRoute>
              <Feed></Feed>
            </ProtectedRoute>
          ),
        },
        {
          path: "/postDetails/:id",
          element: (
            <ProtectedRoute>
              <PostDetails></PostDetails>
            </ProtectedRoute>
          ),
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
             
              <Profile></Profile>
            </ProtectedRoute>
          ),
        },
        {
          path: "/notification",
          element: (
            <ProtectedRoute>
             <Suspense fallback={<Loading></Loading>}> <Notification></Notification></Suspense>
            </ProtectedRoute>
          ),
        },
        { path: "*", element: <h2>not found</h2> },
      ],
    },
  ]);

  const query = new QueryClient();

  return (
    <QueryClientProvider client={query}>
      <div>
        <CounterContextProvider>
          <ToastContainer></ToastContainer>
          <RouterProvider router={routes}></RouterProvider>
        </CounterContextProvider>
      </div>
    </QueryClientProvider>
  );
}
