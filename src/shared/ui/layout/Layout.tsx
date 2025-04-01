import { type ReactNode } from "react";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { ModalProvider } from "@/shared/ui/modal/ModalProvider";
import { InitAuthEffect } from "@/shared/hooks/InitAuthEffect";
interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <InitAuthEffect />
      <Header />
      <main>{children}</main>
      <Footer />
      <ModalProvider />
    </div>
  );
};
