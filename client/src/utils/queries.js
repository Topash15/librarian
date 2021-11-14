import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Query {
    me {
      _id
      email
      username
      bookCount
      savedBooks {
        bookId
        description
        authors
        title
        link
        image
      }
    }
  }
`;
