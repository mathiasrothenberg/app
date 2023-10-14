/// <reference path="./@types/passport-google-oidc.d.ts" />
import express, { Request, Response } from 'express';
import passport, { Strategy } from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Strategy as GoogleStrategy } from 'passport-google-oidc';

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

const gStrategy = new GoogleStrategy({ clientID: 'x', clientSecret: 'x', callbackURL: 'x' }, 
function verify(issuer: string, profile: { id: string; displayName: string }, cb: (error?: Error, user?: object | false) => void) {

});

passport.use(gStrategy)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});