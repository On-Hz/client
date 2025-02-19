import { type ReactNode } from "react";
import { Header } from "../header/Header";
import { Footer } from "../footer/Footer";
import AuthModal from "../modal/modal-auth/AuthModal";
import { ProfileModal } from "../modal/modal-profile/ProfileModal";
import { WriteReviewModal } from "../modal/modal-review/WriteReviewModal";


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
      <ProfileModal />
      <WriteReviewModal />
    </div>
  );
};
