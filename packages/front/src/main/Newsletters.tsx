import React, { useContext } from 'react';
import './../theme/newsletters.scss';
import { ThemeContext } from '../theme/ThemeProvider';
import {
  useSelectorT as useSelector,
  useDispatchT as useDispatch
} from '../redux/hooks';
import { setActiveTab } from '../redux/reducers/mainSlice';
import NewslettersList from './newsletters/Newsletters';
import Recipient from './recipients/Recipient';

const screens: any = [
  NewslettersList,
  Recipient
];

const Main : React.FC = (props) => {
  const {
  } = props;

  const activeTab = useSelector((state) => state.main.activeTab);
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const Component = screens[activeTab];
  const menu = [
    "Newsletters",
    "Recipient Emails"
  ];

  const setActiveTabDispach = (tab: number) => {
    dispatch(setActiveTab(tab));
  };

  return (
    <div className="newsletters">
      <div className={`menu ${theme}`}>
        {menu.map(( name, index ) => (
          <h4
            key={index}
            className={`${index === activeTab && 'menu-active'}`}
            onClick={() => setActiveTabDispach(index)}
          >
            {name}
          </h4>
        ))}
      </div>
      <div>
        <Component setContent={setActiveTabDispach} />
      </div>
    </div>
  );
}

export default Main;
