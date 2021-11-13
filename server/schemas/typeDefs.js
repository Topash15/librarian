const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID,
        username: String,
        email: String,
        password: String,
        bookCount: Int,
        savedBooks: [Book]
    }

    type Book {
        bookId: ID,
        description: String,
        authors: String,
        title: String,
        image: String,
        link: String,
    }

    type Auth{
        token: ID!
        user: User
    }

    type Query {
        me: User
        users: [User]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): User
    }
`

module.exports = typeDefs