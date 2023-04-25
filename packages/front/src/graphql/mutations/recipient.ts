import { gql } from '@apollo/client';

export const CREATE_RECIPIENT = gql`
  mutation createRecipient($recipient: CreateRecipient!) {
    createRecipient(recipient: $recipient) {
      id
    }
  }
`;

export const CREATE_RECIPIENTS = gql`
  mutation createRecipients($recipients: [CreateRecipient!]!) {
    createManyRecipients(recipients: $recipients)
  }
`;
