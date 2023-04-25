import { gql } from '@apollo/client';

export const GET_ALL_EMAILS = gql`
  query getEmailsSendedList{
    emailsSendedList {
      id
      sendDate
    }
  }
`;