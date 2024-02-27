import React, { useState, useEffect } from "react";

const FetchDataComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const url = "https://ki-server.oth-aw.de/user/5f1a/proxy/8000/images/";
    const token = "cbf883cb302e4b5c83c97dcd203b402e"; // Ersetzen Sie <token> durch Ihren tatsächlichen Token
    const headers = {
      Authorization: `token ${token}`,
    };

    fetch(url, { headers })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("There was an error!", error));
  }, []); // Der leere Array bedeutet, dass diese useEffect-Hook nur beim ersten Rendern der Komponente aufgerufen wird.

  return (
    <div>{data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Lädt..."}</div>
  );
};

export default FetchDataComponent;
