import express, { Request, Response } from 'express';
import { handler } from './src';

interface Event {
  [key: string]: any;
}

interface Context {
  [key: string]: any;
}

interface HandlerResult {
  statusCode: number;
  headers: { [key: string]: string };
  body: string;
}

const app = express();
const port = 3000;

app.get('/', async (req: Request, res: Response) => {
  const event: Event = {};
  const context: Context = {};

  try {
    const result: HandlerResult = await handler(event, context);
    res.status(result.statusCode).set(result.headers).send(result.body);
  } catch (error) {
    res.status(500).send('Error in function execution');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
