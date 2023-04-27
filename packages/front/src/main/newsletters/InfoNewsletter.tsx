import React, {
  useRef,
  useContext,
  useState,
  useEffect
} from 'react';
import './../../theme/newsletters.scss';
import { ThemeContext } from '../../theme/ThemeProvider';
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/client';
import { useDispatchT as useDispatch } from '../../redux/hooks';
import { setNotification } from '../../redux/reducers/mainSlice';
import {
  filesToDataURL,
  dataURLToFile,
  getUniqFiles,
  arrayFilesToFileList
} from '../../utils/utils';
import EmailEditor from 'react-email-editor';
import Button from './../../components/core/button';
import Input from './../../components/core/input';
import { CREATE_NEWSLETTER } from '../../graphql/mutations/newsletter';
import { GET_NEWSLETTER } from '../../graphql/querys/newsletter';

interface InfoNewsletter {
  id?: number
  name: string
  design: string
  files?: Array<string>
}

const InfoNewsletter : React.FC = (props) => {
  const {
  } = props;

  const [files, setFiles] = useState<any>([]);
  const dispatch = useDispatch();
  let { id } = useParams();
  const navigate = useNavigate();
  const [createNewsletter, { data, loading, error }] = useMutation(CREATE_NEWSLETTER, {
    refetchQueries: [
      'getAllNewsletters',
      'getNewsletter'
    ],
  });
  const { data: dataQuery } = useQuery(GET_NEWSLETTER, {
    variables: { id: id }
  });
  const { theme } = useContext(ThemeContext);
  const emailEditorRef : any = useRef(null);

  const setValues = async () => {
    const newsletterName : any = document.querySelector("#newsletter-name");
    const newsletterScheduled : any = document.querySelector("#newsletter-scheduled");
    newsletterScheduled.value = dataQuery.newsletter.scheduled.substring(0, 16);
    newsletterName.value = dataQuery.newsletter.name;
    const newFiles = await dataURLToFile(dataQuery.newsletter.files);
    const fileInput : any = document.querySelector("#files");
    setFiles(newFiles);
    fileInput.files = arrayFilesToFileList(newFiles);
    emailEditorRef.current?.editor?.loadDesign(
      JSON.parse(dataQuery.newsletter.design)
    );
  };

  useEffect(() => {
    if(dataQuery && typeof id === "string") setValues();
  }, [dataQuery]);

  useEffect(() => {
    if (data) {
      dispatch(setNotification({
        message: "Newsletter has been saved",
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

  const saveNewsletter = async (e : any) => {
    e.preventDefault();
    const newsletterName : any = document.querySelector("#newsletter-name");
    const newsletterScheduled : any = document.querySelector("#newsletter-scheduled");
    const newFiles = await filesToDataURL(files);
    emailEditorRef.current?.editor?.exportHtml((data: any) => {
      const { html, design } = data;
      createNewsletter({ variables: {
        newsletter: {
          id: id,
          name: newsletterName.value,
          design: JSON.stringify(design),
          scheduled: newsletterScheduled.value,
          html: html,
          files: newFiles
        }
      }});
    });
  };

  const onReady = () => {
    emailEditorRef.current?.editor?.setAppearance({
      theme: theme,
      panels: {
        tools: {
          dock: 'left'
        }
      }
    });
  };

  const onInputAction =  async () => {
    const fileInput : any = document.querySelector("#files");
    const newFilesList = Array.from(fileInput?.files);
    const filesList = await getUniqFiles(newFilesList,files);
    setFiles(filesList);
    fileInput.files = arrayFilesToFileList(filesList);
  };

  const removeFile = (name: string) => {
    const fileInput : any = document.querySelector("#files");
    const newList = files.filter((item : any) => item.name !== name);
    setFiles(newList);
    fileInput.files = arrayFilesToFileList(newList);
  };

  return (
    <div className='info-newslatter'>
      <form onSubmit={saveNewsletter}>
        <div className='info-newslatter-buttons'>
          <Link to="/newsletters">
            <Button>
              <i className='fas fa-arrow-left' />
            </Button>
          </Link>
          <Input
            id="newsletter-name"
            placeholder="New Proyect Name"
            required
          />
          <label>Scheduled:</label>
          <input
            type="datetime-local"
            id="newsletter-scheduled"
          />
          <Button type="submit">
            {loading ? (
              <i className='fas fa-spinner fa-spin' />
            ) : (
              <i className='fas fa-upload' />
            )}
            <div>Save Newsletter</div>
          </Button>
        </div>
        <br />
        <div className='info-newslatter-buttons'>
          <Button>
            <i className='fas fa-paperclip' />
            <div>Attach files</div>
            <Input
              onInput={onInputAction}
              type="file"
              id="files"
              accept="image/png, .pdf"
              multiple
            />
          </Button>
          {files.map(({ name } : any) => (
            <div key={name} onClick={() => removeFile(name)} className='file-name'>
              <label>{name}</label>
              <i className='fas fa-times' />
            </div>
          ))}
        </div>
        <br />
        <EmailEditor
          ref={emailEditorRef}
          onReady={onReady}
        />
      </form>
    </div>
  );
}

export default InfoNewsletter;
