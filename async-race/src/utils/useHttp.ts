type Body = {
  name?: string;
  color?: string;
  wins?: number;
  time?: number;
};

const useHttp = () => {
  const sendRequest = async (url: string, method = "GET", body?: Body) => {
    let responseData;

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

      responseData = await response.json();
    } catch (error) {
      // Handle the error
      console.error("Error");
    }

    return responseData;
  };

  return {
    sendRequest,
  };
};

export default useHttp;
