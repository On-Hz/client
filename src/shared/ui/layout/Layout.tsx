import { type ReactNode } from "react";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { ModalProvider } from "@/shared/ui/modal/ModalProvider";
import { ScrollToTopButton } from "../scrollToTopButton/scrollToTopButton";
interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      <ModalProvider />
      <ScrollToTopButton /> 
    </div>
  );
};
