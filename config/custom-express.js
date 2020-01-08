import express from 'express';
import consign from 'consign';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

consign()
  .include('controllers')
  .into(app);

export default () => app;
