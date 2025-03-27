import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} from "graphql";
// import lodash from 'lodash';
import Task from "../models/task.js";
import Project from "../models/project.js";

const TaskType = new GraphQLObjectType({
  name: 'Task',
  // returning function instead of object to avoid circular dependency error
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLString },
    description: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve: async (parent) => {
        return await Project.findById(parent.projectId);
      },
    },
  }),
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    tasks: {
      type: GraphQLList(TaskType),
      resolve: async (parent) => {
        return await Task.find({ projectId: parent.id });
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (_, args) => {
        return await Task.findById(args.id);
      },
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: async (_, args) => {
        return await Project.findById(args.id);
      },
    },
    tasks: {
      type: GraphQLList(TaskType),
      resolve: async () => {
        return await Task.find();
      },
    },
    projects: {
      type: GraphQLList(ProjectType),
      resolve: async () => {
        return await Project.find();
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addProject: {
      type: ProjectType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        weight: { type: GraphQLNonNull(GraphQLInt) },
        description: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        const project = new Project({
          title: args.title,
          weight: args.weight,
          description: args.description,
        });
        return project.save();
      },
    },
  }),
});

// const tasks = [
//   {
//     id: '1',
//     title: 'Create your first webpage',
//     weight: 1,
//     description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)',
//     projectId: '1',
//   },
//   {
//     id: '2',
//     title: 'Structure your webpage',
//     weight: 1,
//     description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order',
//     projectId: '1',
//   },
// ]
//
// const projects = [
//   {
//     id: '1',
//     title: 'Advanced HTML',
//     weight: 1,
//     description: 'Welcome to the Web Stack specialization. The 3 first projects will give you all basics of the Web development: HTML, CSS and Developer tools. In this project, you will learn how to use HTML tags to structure a web page. No CSS, no styling - don\'t worry, the final page will be “ugly” it\'s normal, it\'s not the purpose of this project. Important note: details are important! lowercase vs uppercase / wrong letter… be careful!',
//   },
//   {
//     id: '2',
//     title: 'Bootstrap',
//     weight: 1,
//     description: 'Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS and JavaScript design templates for typography, forms, buttons, navigation, and other interface components.',
//   }
// ]

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: Mutation,
});
