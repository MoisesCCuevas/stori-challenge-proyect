import { gql } from '@apollo/client';

export const GET_ALL_RECIPIENTS = gql`
  query getAllResipients {
    recipientList {
      id
      name
      email
    }
  }
`;

export const GET_RECIPIENT = gql`
  query getRecipient($id: String!){
    recipient(id: $id){
      id
      name
      email
      suscribed {
        name
        id
      }
    }
  }
`;
