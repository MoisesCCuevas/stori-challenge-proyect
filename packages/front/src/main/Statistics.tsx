import React from 'react';
import '../theme/newsletters.scss';
import ListItem from '../components/core/listItem';
import { useQuery } from '@apollo/client';
import { GET_ALL_RECIPIENTS } from './../graphql/querys/recipient';
import { GET_ALL_NEWSLETTERS } from './../graphql/querys/newsletter';
import { GET_ALL_EMAILS } from './../graphql/querys/statistics';

const Statistics : React.FC = (props) => {
  const {
  } = props;

  const { loading: l1, error: e1, data: d1 } = useQuery(GET_ALL_RECIPIENTS);
  const { loading: l2, error: e2, data: d2 } = useQuery(GET_ALL_NEWSLETTERS);
  const { loading: l3, error: e3, data: d3 } = useQuery(GET_ALL_EMAILS);

  return (
    <div className="info-newslatter">
      <div className='statistics-container'>
        <ListItem>
          <label>Total of Recipients:</label>
          <h2>{d1?.recipientList.length}</h2>
          {l1 && <i className='fas fa-spinner fa-spin' />}
        </ListItem>
        <ListItem>
          <label>Total of Newsletters:</label>
          <h2>{d2?.newsletterList.length}</h2>
          {l2 && <i className='fas fa-spinner fa-spin' />}
        </ListItem>
        <ListItem>
          <label>Total of Emails sended:</label>
          <h2>{d3?.emailsSendedList.length}</h2>
          {l3 && <i className='fas fa-spinner fa-spin' />}
        </ListItem>
      </div>
    </div>
  );
}

export default Statistics;
