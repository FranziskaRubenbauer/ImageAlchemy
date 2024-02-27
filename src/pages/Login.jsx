import React, { useState, useEffect } from "react";

/*
Gitlab Application ID: 74fd3733b8a9aed9f76cdfa67aeee7b0573e3a7b0ef3d548e2f3d3825aae8440
Secret: gloas-44c8da5453407263e9bd9aa74540063f6aa9ce8bc45f2c4bd728bb50d6d122a3
Callback URL: https://ki-server.oth-aw.de/user/5f1a/lab?

*/

function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const access_token = "cbf883cb302e4b5c83c97dcd203b402e";
      const headers = {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      };

      try {
        const response = await fetch(
          "https://ki-server.oth-aw.de/user/5f1a/proxy/8810",
          {
            method: "GET",
            headers: headers,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
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
      {userInfo ? (
        <div>
          <h2>User Information</h2>
          <p>Username: {userInfo.username}</p>
          {/* Weitere Benutzerinformationen hier einfügen */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserInfo;
