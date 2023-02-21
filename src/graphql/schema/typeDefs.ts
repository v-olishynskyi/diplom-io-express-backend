import global from './global';
import users from '../schema/user/typeDefs';
import markers from '../schema/markers/typeDefs';
import category from '../schema/category/typeDefs';

const typeDefs = [...global, users, markers, category];

export default typeDefs;
