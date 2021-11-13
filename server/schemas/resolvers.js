const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // gets all users
        // used for testing purposes
        users: async ()=>{
            return User.find()
        },
        me: async (parent, args, context)=>{
            if (context.user){
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('books')

                return userData
            }

            throw new AuthenticationError('Not logged in!')
        }
    },

    Mutation: {
        // adds user
        addUser: async (parent, args)=>{
            const user = await User.create(args)
            const token = signToken(user)

            return { token, user } 
        },
        // login user
        login: async (parent, {email, password})=>{
            const user = await User.findOne({ email });
            console.log(user)
            // if no user is found, return error
            if(!user){
                throw new AuthenticationError('Incorrect credentials')
            }
            
            const correctPw = await user.isCorrectPassword(password);

            // if password is incorrect or missing, return error
            if(!correctPw){
                throw new AuthenticationError('Incorrect credentials')
            }

            const token = signToken(user)

            console.log(user)
            return {token, user}
        },
        // saveBook: async (parent, args, context) => {
        //     if(context.user){
        //         const book = await Book.create(args)

        //         const user = await User.findByIdAndUpdate(
        //             {_id: context.user._id},
        //             { $push: { books: bookId}},
        //             { new: true }
        //         );
        //         console.log(context.user)
        //         return book;
        //     }

        //     throw new AuthenticationError('You need to be logged in to save a book!')
        // }
    }
}

module.exports = resolvers;
