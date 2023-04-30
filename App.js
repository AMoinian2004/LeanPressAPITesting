// src/App.js
import React, { useState } from 'react';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';

const App = () => {
const [userData, setUserData] = useState(null);

return (
<div>
{!userData ? (
<Login setUserData={setUserData} />
) : (
<UserDashboard userData={userData} />
)}
</div>
);
};

export default App;
