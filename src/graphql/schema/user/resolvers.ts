import MarkerModel from '../../../models/marker/MarkerModel';
import UserModel from '../../../models/user/UserModel';

const resolvers = {
  Query: {
    // @ts-ignore
    users: async (obj, args, context, info) => {
      const users = await UserModel.find().populate('markers');
      return users;
    },
    // @ts-ignore
    user: async (obj, { id }, context, info) => {
      return await UserModel.findById({ _id: id });
    },
    // @ts-ignore
    userByEmail: async (obj, { email }, context, info) => {
      return await UserModel.findOne({ email }).populate('markers');
    },
    // @ts-ignore
    userByFilter: async (obj, { filter }, context, info) => {
      return await UserModel.find(filter).populate('markers');
    },
  },

  Mutation: {
    // @ts-ignore
    updateUser: async (obj, { input }, context, info) => {
      const user = await UserModel.findByIdAndUpdate(
        input._id,
        { $set: input },
        { new: true, populate: 'markers' }
      );

      return { user };
    },
    // @ts-ignore
    deleteUser: async (obj, { input }, _1, _2) => {
      const user = await UserModel.findByIdAndRemove(input.id).populate(
        'owner'
      );

      return { user };
    },
  },

  User: {
    // @ts-ignore
    markers: async (obj, args, context, info) => {
      return await MarkerModel.find({ owner: obj._id }).populate('category');
    },
  },
};

export default resolvers;
