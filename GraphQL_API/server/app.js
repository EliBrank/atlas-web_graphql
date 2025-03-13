import express from 'express';
import { graphqlHTTP } from 'express-graphql';

const app = express();

app.use('/graphql', graphqlHTTP({
}));
app.listen(5000, () => {
  console.log('now listening for request on port 4000');
});
