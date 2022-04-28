import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
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

export const SAVE_BOOK = gql`
  mutation saveBook($authors: String, $description: String!, $bookId: String!, $image: String, $link: String, $title: String) {
      saveBook(authors: $authors, description: $description, bookId: $bookId, image: $image, link: $link, title: $title) {
          token
          user {
            _id
            username
            savedBooks {
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
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: ID!){
      deleteBook(bookId: $bookId) {
          token
          user {
            _id
            username
            savedBooks {
              bookId
            }
          }
      } 
  }
`;