import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { useDispatchT as useDispatch } from '../../redux/hooks';
import { setNotification } from '../../redux/reducers/mainSlice';
import Button from '../../components/core/button';
import Input from '../../components/core/input';
import ListItem from '../../components/container/listItem';
import DataList from '../../components/container/dataList';
import { GET_ALL_RECIPIENTS } from '../../graphql/querys/recipient';
import { CREATE_RECIPIENTS } from '../../graphql/mutations/recipient';

const Recipient : React.FC = (props) => {
  const {
  } = props;

  const { loading, error, data } = useQuery(GET_ALL_RECIPIENTS);
  const [createRecipients, { data: dataF, error: errorF }] = useMutation(CREATE_RECIPIENTS, {
    refetchQueries: [
      'getAllResipients'
    ],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (error || errorF) {
      dispatch(setNotification({
        message: error?.message || errorF?.message,
        type: "error"
      }));
    }
  }, [error, errorF]);

  useEffect(() => {
    if (dataF) {
      dispatch(setNotification({
        message: "Recipients Added",
        type: "success"
      }));
    }
  }, [dataF]);

  const onInputJson = async () => {
    const fileInput : any = document.querySelector("#file");
    if (fileInput.files) {
      const input = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsBinaryString(fileInput?.files[0]);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      })
      const text = await input;
      const fileObject = JSON.parse(JSON.parse(JSON.stringify(text)));
      createRecipients({ variables: {
        recipients: fileObject.data
      }});
    }
  };

  return (
    <div className="info-newslatter">
      <div className='info-newslatter-buttons'>
        <Link to="/newsletters/info-recipient">
          <Button>
            <i className='fas fa-plus'/>
            <div>Add New Recipient</div>
          </Button>
        </Link>
        <Button>
          <i className='far fa-folder-open'/>
          <div>Load From File</div>
          <Input
            onInput={onInputJson}
            type="file"
            id="file"
            accept=".json"
          />
        </Button>
      </div>
      <br />
      <DataList
        loading={loading}
        data={data?.recipientList}
        isEmpty={data?.recipientList.length <= 0}
        onLoading={() => <i className='fas fa-spinner fa-spin' />}
        onEmpty={() => (
          <ListItem>
            <h3>Recipients Not Found</h3>
          </ListItem>
        )}
        render={({ id, name, email }: any) => (
          <ListItem key={id}>
            <p>{name}</p>
            <p>{email}</p>
            <div className='buttons-container'>
              <Link to={`/newsletters/info-recipient/${id}`}>
                <Button>
                  <i className='fas fa-pen'/>
                  <div>Edit</div>
                </Button>
              </Link>
            </div>
          </ListItem>
        )}
      />
    </div>
  );
}

export default Recipient;
