import { useState, useEffect } from 'react';

export function useFetchJson(url, ready = true) {
  // 'ready is a broken concept in the world of changing URLS :)'
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (!ready) {
      return;
    }

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        setResponse(jsonData)
      }).catch((error) => {
        console.log(error);
      });
  }, [url]);

  return response;
}