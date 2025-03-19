import { useState } from "react";

export const useSignUpError = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setError = (message: string | null) => {
    setErrorMessage(message);
  };

  return { errorMessage, setError };
};