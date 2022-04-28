const { User } = require('../models')
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        user: async ( parent, { _id, username}, {user}) => {
            return User.findOne({
                $or: [{ _id: user ? user._id : _id}, { username: username }],
              });
        },

    },
    Mutation: {
        createUser: async (parent, args) => {
            const user =  await User.create(args);
            return user
        },
        login: async (parent, args) => {
           
            const user = await User.findOne({ $or: [{ username: args.username }, { email: args.email }]});
            if (!user) {
              throw new AuthenticationError('No user found with this email address');
            }
            const correctPw = await user.isCorrectPassword(args.password);
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveBook: async (parent, args, context) => {
            console.log(user);
                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {savedBooks: args}},
                    {new: true}
                );
                return updatedUser
        },
        deleteBook: async (parent, args, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );
            return updatedUser
        },
    },
}

module.exports = resolvers