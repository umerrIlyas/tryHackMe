import { useEffect, useState } from "react";

export default function FetchData(url, reqMethod, payload) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const res = await fetch(
        url,
        payload && {
          method: reqMethod,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      console.log("res", res);
      let data = await res.json();
      setData(data);
      setIsLoading(false);
    })();
  }, [url, payload, reqMethod]);

  return { isLoading, data };
}
