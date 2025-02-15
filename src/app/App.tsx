import React from "react";
import Providers from "./hoc";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "@/shared/ui/layout/Layout";
import { Routing } from "@/shared/routing/routing";

export const App: React.FC = () => {
  return (
    <Providers>
      <Layout>
        <Routing />
      </Layout>
      <ToastContainer />
    </Providers>
  );
};
