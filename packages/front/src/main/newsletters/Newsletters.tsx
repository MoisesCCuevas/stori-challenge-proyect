import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatchT as useDispatch } from '../../redux/hooks';
import { setNotification } from '../../redux/reducers/mainSlice';
import { useQuery, useMutation } from '@apollo/client';
import Button from '../../components/core/button';
import ListItem from '../../components/container/listItem';
import DataList from '../../components/container/dataList';
import { GET_ALL_NEWSLETTERS } from '../../graphql/querys/newsletter';
import { SEND_NEWSLETTER } from '../../graphql/mutations/newsletter';

const Newsletters : React.FC = (props) => {
  const {
  } = props;

  const { loading, error, data } = useQuery(GET_ALL_NEWSLETTERS);
  const [send, { data: dataS, error: errorS, loading: loadingS }] = useMutation(SEND_NEWSLETTER, {
    refetchQueries: [
      'getEmailsSendedList'
    ],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (error || errorS) {
      dispatch(setNotification({
        message: error?.message || errorS?.message,
        type: "error"
      }));
    }
  }, [error, errorS]);

  useEffect(() => {
    if (dataS?.submission) {
      dispatch(setNotification({
        message: "Newsletter Sended",
        type: "success"
      }));
    }
    if (dataS?.submission === false) {
      dispatch(setNotification({
        message: "Email service Fail",
        type: "error"
      }));
    }
  }, [dataS]);

  const submissionAction = (id: string) => {
    send({ variables: { id }});
  };

  return (
    <div className="info-newslatter">
      <Link to="/newsletters/info-newsletter">
        <Button>
          <i className='fas fa-plus'/>
          <div>Create a Newsletter</div>
        </Button>
      </Link>
      <br />
      <DataList
        loading={loading || loadingS}
        data={data?.newsletterList}
        isEmpty={data?.newsletterList.length <= 0}
        onLoading={() => <i className='fas fa-spinner fa-spin' />}
        onEmpty={() => (
          <ListItem>
            <h3>Newsletters Not Found</h3>
          </ListItem>
        )}
        render={({ id, name }: any) => (
          <ListItem key={id}>
            <p>{name}</p>
            <div className='buttons-container'>
              <Link to={`/newsletters/info-newsletter/${id}`}>
                <Button>
                  <i className='fas fa-pen'/>
                  <div>Edit</div>
                </Button>
              </Link>
              <Button onClick={() => submissionAction(id)}>
                <i className='fas fa-paper-plane'/>
                <div>Submission</div>
              </Button>
            </div>
          </ListItem>
        )}
      />
    </div>
  );
}

export default Newsletters;
