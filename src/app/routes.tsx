import { createBrowserRouter } from "react-router";
import { HomePage } from "./components/HomePage";
import { HostelDetail } from "./components/HostelDetail";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { useEffect } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Set language attribute on html element
    document.documentElement.lang = "en";
  }, []);

  return (
    <>
      <AnimatedBackground />
      {children}
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/hostel/:id",
    element: (
      <Layout>
        <HostelDetail />
      </Layout>
    ),
  },
]);