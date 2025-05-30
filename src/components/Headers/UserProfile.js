import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserProfile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  useEffect(() => {
    axios.get('https://localhost:7219/api/User/getUserData',
      {
        headers: {
          "Authorization": "Bearer " + getCookie("token")
        }
      }
    )
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

  const handleChange = (e) => {
    const{name, value} = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className='flex justify-center m-6 font-bold'>User Profile</h2>

      <div className='border-orange-600 '>

      <div>

      Username : <input
      type='text'
      name='username'
      onChange={handleChange}
      value={userData.username}/>
      </div>
      <div>

      Email : <input 
      type='text'
      name='email'
      value={userData.email}
      onChange={handleChange}
      className=''/>
      </div>

      <div>
      Mobile : <input 
      type='text'
      onChange={handleChange}
      name='mobile'
      value={userData.mobile}/>
      </div>

      <button className="bg-blue-600 text-white font-semibold rounded-lg px-4 py-2 m-2 shadow-md
      hover:bg-yellow-400 hover:text-black transition duration-500 ease-in-out focus:outline-none 
      focus:ring-2 focus:ring-yellow-400">
        Update
      </button>

        </div>

    </div>
  );
}

export default UserProfile;