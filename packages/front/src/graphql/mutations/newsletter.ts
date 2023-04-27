import { gql } from '@apollo/client';

export const CREATE_NEWSLETTER = gql`
  mutation createNewsletter($newsletter: CreateNewsletter!) {
    createNewsletter(newsletter: $newsletter) {
      id
    }
  }
`;

export const SEND_NEWSLETTER = gql`
  mutation send ($id: String!){
    submission (id: $id)
  }
`;
