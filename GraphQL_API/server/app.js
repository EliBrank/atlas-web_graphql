import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema.js';

const app = express();
const PORT = 5000;

app.use('/graphql', graphqlHTTP({
  schema: schema,
}));
app.listen(PORT, () => {
  console.log(`now listening for request on port ${PORT}`);
});
