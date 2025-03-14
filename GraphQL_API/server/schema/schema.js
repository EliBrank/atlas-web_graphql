import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from "graphql";

const TaskType = new GraphQLObjectType({
  name: 'Task',
  // returning function instead of object to avoid circular dependency error
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

const schema = new GraphQLSchema({
  query: TaskType,
});

export default schema;
