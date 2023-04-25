import React from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Profile from './Profile';

interface Navbar {
  isAuthenticated: boolean
}

const Navbar : React.FC<Navbar> = (props) => {
  const {
    isAuthenticated
  } = props;

  const { user } = useAuth0();

  return (
    <nav className="navbar" data-testid="navbar">
      <img width="180px" alt="" src="/LogoStori.png" />
      <div>
        <Link to="/"><h3>Home</h3></Link>
        {isAuthenticated && (
          <>
            <Link to="newsletters"><h3>Newsletters</h3></Link>
            <Link to="statistics"><h3>Statistics</h3></Link>
          </>
        )}
        <Profile user={user || {}} />
      </div>
    </nav>
  );
}

export default Navbar;
