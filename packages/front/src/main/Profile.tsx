import React, { useState, useContext } from 'react';
import { ThemeContext } from '../theme/ThemeProvider';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '../components/core/button';
import { withRoles } from '../hoc/withRoles';

export interface Profile {
  user: {
    name?: string,
    picture?: string,
    email?: string
  },
  roles?: any
};

const Profile : React.FC<Profile> = (props) => {
  const {
    user
  } = props;

  const { theme, setTheme } = useContext(ThemeContext);
  const { logout, loginWithRedirect, isAuthenticated } = useAuth0();
  const { name } = user;
  const [menuOpen, setMenuOpen] = useState(false);

  const onClickButton = () => {
    if (isAuthenticated) setMenuOpen(!menuOpen);
    else loginWithRedirect();
  };

  const onChangeMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <div className={`profile-name`} data-testid="profile">
      <Button
        onClick={onClickButton}
        active={menuOpen}
      >
        {isAuthenticated ? name : 'Login'}
      </Button>
      {menuOpen && (
        <div className='profile-menu'>
          <ul>
            <li>
              <p>Profile</p>
              <i className='fas fa-user-alt' />
            </li>
            <li onClick={onChangeMode}>
              {theme === 'light' ? (
                <>
                  <p>Night Mode</p>
                  <i className='fas fa-moon' />
                </>
              ) : (
                <>
                  <p>Day Mode</p>
                  <i className='fas fa-sun' />
                </>
              )}
            </li>
            <li onClick={() => logout()}>
              <p>Logout</p>
              <i className='fas fa-power-off' />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default withRoles(Profile);
