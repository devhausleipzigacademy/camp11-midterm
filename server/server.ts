import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { getGenres } from './controllers/genre.controller';
import {
  getAllFavData,
  switchFavData,
  getFavData,
  logInUser,
  createUser,
  getUserData,
  createTicket,
  changeUserData,
  getReservations,
} from '../server/controllers/user.controller';
import { validate } from './middleware/user.middleware';
import {
  loginSchema,
  registerSchema,
} from './schema/createLoginRegisterSchema';

import { isAuth } from './middleware/auth.middleware';
import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreExpressHandler } from '@edgestore/server/adapters/express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { profileSchema } from './schema/profileSchema';

//import { LogIn, Register } from './controllers';

//serverport
const PORT = process.env.PORT;
const app = express();
const es = initEdgeStore.create();
const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket().beforeDelete(({ ctx, fileInfo }) => {
    console.log('beforeDelete', ctx, fileInfo);
    return true; // allow delete
  }),
});

export type EdgeStoreRouter = typeof edgeStoreRouter;

const handler = createEdgeStoreExpressHandler({
  router: edgeStoreRouter,
});

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

//Middleware
app.use(express.json());

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());

//post request
app.post('/register', validate(registerSchema), createUser);
app.post('/login', validate(loginSchema), logInUser);

//secure
app.post('/reservation', isAuth, createTicket);

//get request
app.get('/genres', getGenres);

//user profile
//secure
app.get('/user/', isAuth, getUserData);
app.put('/user/', isAuth, validate(profileSchema), changeUserData);

// reservation logic
app.get('/reservation/:movieId', getReservations);

//bookmarked movies logic
app.get('/movies/:movieId', getFavData);
app.post('/movies/:movieId', switchFavData);
app.delete('/movies/:movieId', switchFavData);
app.get('/bookmarked-movies', getAllFavData);

//edgestore router
app.get('/edgestore/*', handler);
app.post('/edgestore/*', handler);
app.delete('/edgestore/*', handler);

//start server
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`);
});
