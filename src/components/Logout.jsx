import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Logout = () => {
  const { logout } = useAuth0();
  localStorage.removeItem('userStored');
  return (
    logout({
        returnTo: window.location.origin,
      })
  );
};

export default Logout;
