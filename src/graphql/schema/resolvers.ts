import merge from 'lodash/merge';

import users from './user/resolvers';

// @ts-ignore
const resolvers = merge(users);

export default resolvers;
