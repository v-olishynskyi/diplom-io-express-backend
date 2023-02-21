import common from './common';
import { Query, Mutation } from './typeDefs';
// import { Query, Mutation, Subscription } from './typeDefs';

const global = [Query, Mutation, common];
// const global = [Query, Mutation, Subscription, common];

export default global;
