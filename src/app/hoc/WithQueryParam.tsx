import React, { createContext, FC, useContext } from "react";
import { useSearchParams } from "react-router-dom";

interface QueryParamContextProps {
  searchParams: URLSearchParams;
  setSearchParams: (params: Record<string, string | number | boolean>) => void;
}

const QueryParamContext = createContext<QueryParamContextProps | undefined>(
  undefined
);

export const QueryParamProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchParams, setRawSearchParams] = useSearchParams();

  const setSearchParams = (
    params: Record<string, string | number | boolean>
  ) => {
    const newParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      newParams.set(key, String(value));
    });
    setRawSearchParams(newParams);
  };

  return (
    <QueryParamContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </QueryParamContext.Provider>
  );
};

export const useQueryParams = () => {
  const context = useContext(QueryParamContext);
  if (!context) {
    throw new Error("useQueryParams must be used within a QueryParamProvider");
  }
  return context;
};
