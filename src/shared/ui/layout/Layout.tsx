import { type ReactNode } from "react";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import AuthModal from "../modal/modal-auth/AuthModal";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      <AuthModal />
    </div>
  );
};
