import React, { useContext } from 'react';
import '../theme/main.scss';
import { ThemeContext } from '../theme/ThemeProvider';
import { Routes, Route } from "react-router-dom";
import { useSelectorT as useSelector, useDispatchT as useDispatch } from '../redux/hooks';
import { setNotification } from '../redux/reducers/mainSlice';
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from './Navbar';
import Home from './Home';
import Main from './Newsletters';
import InfoNewsletter from './newsletters/InfoNewsletter';
import InfoRecipient from './recipients/InfoRecipient';
import Statistics from './Statistics';
import Notification from './../components/core/notification';

const App : React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const { isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const { message, type } = useSelector((state) => state.main.notification);

  const clearNotification = () => {
    dispatch(setNotification({ message: undefined, type: undefined }));
  };

  return (
    <div className={`main-container ${theme}`} data-testid="home">
      <Navbar isAuthenticated={isAuthenticated} />
      <Notification message={message} type={type} clearFunction={clearNotification} />
      <div className='content'>
        <Routes>
          <Route index path="/" element={<Home />} />
          {isAuthenticated && (
            <>
              <Route path="newsletters" element={<Main />} />
              <Route path="/newsletters/info-newsletter" element={<InfoNewsletter />} >
                <Route path=":id" element={<InfoNewsletter />} />
              </Route>
              <Route path="/newsletters/info-recipient" element={<InfoRecipient />} >
                <Route path=":id" element={<InfoRecipient />} />
              </Route>
              <Route path="statistics" element={<Statistics />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
