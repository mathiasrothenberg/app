/// <reference path="./@types/passport-google-oidc.d.ts" />
import express, { Request, Response } from 'express';
import passport, { Strategy } from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Strategy as GoogleStrategy } from 'passport-google-oidc';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(session({
  secret: 'my-secret',
  resave: false,
  cookie: { secure: false },
}));
 
app.use(passport.initialize());
app.use(passport.session())
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

passport.use(new GoogleStrategy(
  { 
    clientID: process.env['GOOGLE_CLIENT_ID'] as string,
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'] as string,
    callbackURL: process.env['GOOGLE_CALLBACK'] as string
  }, 
function verify(issuer: string, profile: { id: string; displayName: string }, cb: (error?: Error, user?: object | false) => void) {

}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.get('/auth/google/callback', passport.authenticate('oauth2', { scope: ["profile"], failureRedirect: '/login', successRedirect: '/' }));
app.get('/auth/google', passport.authenticate('oauth2'));
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack)
  res.status(500).send('An error occurred')
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});