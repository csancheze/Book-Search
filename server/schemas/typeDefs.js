const { gql } = require('apollo-server-express');

const typeDefs = gql`

  type User {
    _id: ID
    username:String
    email:String
    password: String
    savedBooks: [Book]!
  }

  type Book {
    _id: ID!
    authors: String
    description: String!
    bookId: String!
    image: String
    link: String
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(_id: ID, username: String): User
    me: User
  }

  type Mutation {
    createUser(username:String!, email:String!, password: String!): Auth
    login(username:String, email:String, password: String!): Auth
    saveBook(authors: String, description: String!, bookId: ID!, image: String, link: String, title: String): Auth
    deleteBook(bookId: ID!): Auth
  }
`;

module.exports = typeDefs;
