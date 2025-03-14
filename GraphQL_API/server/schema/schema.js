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

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLString },
      },
      resolve: (parent, args) => {
        return {}
      },
    },
  }),
});

export const schema = new GraphQLSchema({
  query: RootQueryType,
});
