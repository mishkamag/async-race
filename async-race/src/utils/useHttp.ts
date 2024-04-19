import React, { useState } from "react";

type Body = {
  name?: string;
  color?: string;
  wins?: number;
  time?: number;
};

const useHttp = () => {
  const [serverError, setServerError] = useState<boolean>(false);

  const sendRequest = async (url: string, method = "GET", body?: Body) => {
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error:", error);
      setServerError(true);
      throw error;
    }
  };

  return {
    sendRequest,
    serverError,
    setServerError,
  };
};

export default useHttp;
