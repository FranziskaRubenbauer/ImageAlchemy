import React, { useState, useEffect } from "react";

/*
Gitlab Application ID: 74fd3733b8a9aed9f76cdfa67aeee7b0573e3a7b0ef3d548e2f3d3825aae8440
Secret: gloas-44c8da5453407263e9bd9aa74540063f6aa9ce8bc45f2c4bd728bb50d6d122a3
Callback URL: https://ki-server.oth-aw.de/user/5f1a/lab?

*/

function ServerInfo() {
  const [info, setInfo] = useState(null);

  const imageFile = "/Image-Alchemy.png"; // Hier setzt du das Bild ein

  // Erstelle ein FormData-Objekt und füge das Bild hinzu
  const formData = new FormData();
  formData.append("image", imageFile);

  useEffect(() => {
    const fetchData = async () => {
      const access_token = "cbf883cb302e4b5c83c97dcd203b402e";
      const headers = {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      };

      try {
        const response = await fetch(
          "https://ki-server.oth-aw.de/user/5f1a/proxy/8810/test/",
          {
            method: "GET",
            headers: headers,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setInfo(data);
        } else {
          console.error("Error:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {info ? (
        <div>
          <p>Serverinfo {info.username}</p>
        </div>
      ) : null}
    </div>
  );
}

export default ServerInfo;
