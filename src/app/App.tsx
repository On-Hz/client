import React from "react";
import Providers from "./hoc";
import { Layout } from "@/shared/ui";
import { Routing } from "@/shared/routing";

export const App: React.FC = () => {
  return (
    <Providers>
      <Layout>
        <Routing />
      </Layout>
    </Providers>
  );
};
