import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './schema/schema.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// load environment variables from file
dotenv.config();

const app = express();
const PORT = 4000;

const mongoUri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}
@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}
/?appName=${process.env.MONGODB_APPNAME}`;

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema,
}));
app.listen(PORT, () => {
  console.log(`now listening for request on port ${PORT}`);
});
