import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://localhost:7219/api/User/getUserData/3')
      .then(response => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        setError("Kuch gadbad ho gayi!");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Mobile:</strong> {userData.mobile}</p>

      <button className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 m-2 shadow-md
      hover:bg-yellow-400 hover:text-black transition duration-500 ease-in-out focus:outline-none 
      focus:ring-2 focus:ring-yellow-400">
  Update
</button>


    </div>
  );
}

export default UserProfile;


// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// function UserProfile() {
//   const [userData, setUserData] = useState(null);
  
//   useEffect(() => {
//     axios.get(`https://localhost:7219/api/User/getUserData/2`)
//     .then(res => {
//       setUserData(res.data);
//     }).catch(e => {
//       console.error("Data is not fetch "+e);
//     })
//   }, [])
//   return (
//     <div>

//     <h2>Helloo, {userData.username}</h2>
//     <p>Email : {userData.email}</p>
//     <p>Mobile : {userData.mobile}</p>
//     </div>
//   )
// }

// export default UserProfile



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function UserProfile({ userId }) {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!userId) return;

//     setLoading(true);
//     axios.get(`https://localhost:7219/api/User/getUserData/${userId}`)
//       .then(response => {
//         setUserData(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("Error fetching user data:", error);
//         setError("Kuch gadbad ho gayi!");
//         setLoading(false);
//       });
//   }, [userId]); // Re-run effect if userId changes

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//     <div>
//       <h2>Hello, {userData.username}</h2>
//       <p><strong>Email:</strong> {userData.email}</p>
//       <p><strong>Mobile:</strong> {userData.mobile}</p>

//       <button className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 m-2 shadow-md hover:bg-yellow-400 hover:text-black transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400">
//         Update
//       </button>
//     </div>
//   );
// }

// export default UserProfile;

