import { MainPage } from "@/pages/main";
import { SearchPage } from "@/pages/search";
import React from "react";
import { Routes, Route } from "react-router-dom";

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
};
