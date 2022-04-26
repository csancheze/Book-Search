import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      _id
      username
      email
      password
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $email: String!, $password: String!) {
    login(username: $username, email: $email, password: $password) {
      token
      user {
          _id
          username
      }
    }
  }
`;

export const SAVE_BOOK = gdl`
  mutation saveBook($authors: String, $description: String!, $bookId: String!, $image: String, $link: String, $title: String!){
      saveBook(authors $authors, decription: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
          token
          _id
          username
          savedbooks {
            _id
            authors
            description
            bookId
            image
            link
            title
          }
      }
  }
`;

export const DELETE_BOOK = gdl`
  mutation deleteBook($bookId: ID!){
      deleteBook(bookId: $bookId) {
          token
          _id
          username
          savedbooks
      }
  }
`;