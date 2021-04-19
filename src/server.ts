import express, { Request } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PORT } from './config';
import { getTimeStamp } from './utils';
import { authRoutes } from './routes/authentication';
import { userRoutes } from './routes/user';
import { houseRoutes } from './routes/house';
// import fs from 'fs';
// import https from 'https';
// import { SECURE_PORT } from './config';

const app = express();
app.use(cors()); // only enable all CORS requests during development/debugging!
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

morgan.token('timestamp', getTimeStamp);
morgan.token('req-body', (req: Request) => JSON.stringify(req.body));
app.use(
  morgan(':timestamp :method :url :status :response-time ms\n    auth = :req[authorization]\n    req  = :req-body'),
);

const baseURL = '/api/v1';
app.use(`${baseURL}/auth`, authRoutes);
app.use(`${baseURL}/houses`, houseRoutes);
app.use(`${baseURL}/user`, userRoutes);

app.listen(PORT, () => console.info(`${getTimeStamp()} Server is listening to http on ${PORT}`));

// https
//   .createServer(
//     {
//       cert: fs.readFileSync('server.cert'),
//       key: fs.readFileSync('server.key'),
//     },
//     app,
//   )
//   .listen(SECURE_PORT, () => console.info(`${getTimeStamp()} Server is listening to https on ${SECURE_PORT}`));
