import { gql } from '@apollo/client';

export const GET_ALL_NEWSLETTERS = gql`
  query getAllNewsletters {
    newsletterList {
      id
      name
    }
  }
`;

export const GET_NEWSLETTER = gql`
  query getNewsletter($id: Int!){
    newsletter(id: $id){
      id
      name
      design
      scheduled
      files {
        fileName
        data
      }
    }
  }
`;
