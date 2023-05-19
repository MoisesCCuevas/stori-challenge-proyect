import React, {
  useRef,
  useState,
  useEffect
} from 'react';
import './../../theme/newsletters.scss';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/client';
import { useDispatchT as useDispatch } from '../../redux/hooks';
import { setNotification } from '../../redux/reducers/mainSlice';
import Button from '../../components/core/button';
import Input from '../../components/core/input';
import ListItem from '../../components/container/listItem';
import { CREATE_RECIPIENT } from '../../graphql/mutations/recipient';
import { GET_RECIPIENT } from '../../graphql/querys/recipient';
import { GET_ALL_NEWSLETTERS } from '../../graphql/querys/newsletter';

interface InfoRecipient {
  id?: number
  name: string
  design: string
  files?: Array<string>
}

const InfoRecipient : React.FC = (props) => {
  const {
  } = props;

  const [newsletters, setNewsletters] = useState<any>([]);
  const dispatch = useDispatch();
  let { id } = useParams();
  const navigate = useNavigate();
  const [createRecipient, { data, loading, error }] = useMutation(CREATE_RECIPIENT, {
    refetchQueries: [
      'getAllResipients',
      'getRecipient'
    ],
  });
  const {
    loading: loadingN,
    data: dataN
  } = useQuery(GET_ALL_NEWSLETTERS);
  const { data: dataQuery } = useQuery(GET_RECIPIENT, {
    variables: { id: id }
  });

  const setValues = async () => {
    const name : any = document.querySelector("#recipient-name");
    const email : any = document.querySelector("#recipient-email");
    name.value = dataQuery.recipient.name;
    email.value = dataQuery.recipient.email;
    setNewsletters(dataQuery.recipient.suscribed.map((n: any) => n.id));
  };

  useEffect(() => {
    if(dataQuery && typeof id === "string") setValues();
  }, [dataQuery]);

  useEffect(() => {
    if (data) {
      dispatch(setNotification({
        message: "Recipient has been saved",
        type: "success"
      }));
      navigate('/newsletters');
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      dispatch(setNotification({
        message: error.message,
        type: "error"
      }));
    }
  }, [error]);

  const saveRecipient = async (e : any) => {
    e.preventDefault();
    const name : any = document.querySelector("#recipient-name");
    const email : any = document.querySelector("#recipient-email");
    createRecipient({ variables: {
      recipient: {
        id: id,
        name: name.value,
        email: email.value,
        suscribed: newsletters
      }
    }});
  };

  const selectNesletter = (id: string) => {
    const newList = [...newsletters];
    if (newList.includes(id)) {
      const index = newList.indexOf(2);
      newList.splice(index, 1);
    }
    else newList.push(id);
    setNewsletters(newList);
  };

  return (
    <div className='info-newslatter'>
      <form onSubmit={saveRecipient}>
        <div className='info-newslatter-buttons'>
          <Link to="/newsletters">
            <Button>
              <i className='fas fa-arrow-left' />
            </Button>
          </Link>
          <Input
            id="recipient-name"
            placeholder="New Recipient Name"
            required
          />
          <Input
            id="recipient-email"
            placeholder="New Recipient Email"
            type='email'
            required
          />
          <Button type="submit">
            {loading ? (
              <i className='fas fa-spinner fa-spin' />
            ) : (
              <i className='fas fa-upload' />
            )}
            <div>Save Recipient</div>
          </Button>
        </div>
        <br />
          <h3>Select Newsletters to suscribe</h3>
        <br />
        {loadingN && <i className='fas fa-spinner fa-spin' />}
        {dataN?.newsletterList.map(({ id, name }: any) => (
          <ListItem key={id} onClick={() => selectNesletter(id)}>
            {newsletters.includes(id) ? (
              <i className='fas fa-check-circle' />
            ) : (
              <i className='far fa-circle' />
            )}
            <p>{name}</p>
          </ListItem>
        ))}
        {dataN === undefined && (
          <ListItem>
            <h3>Newsletters Not Found</h3>
          </ListItem>
        )}
      </form>
    </div>
  );
}

export default InfoRecipient;
  