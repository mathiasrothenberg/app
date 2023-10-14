/// <reference path="./@types/passport-google-oidc.d.ts" />
import express, { Request, Response } from 'express';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Strategy as GoogleStrategy } from 'passport-google-oidc';
import dotenv from 'dotenv';

dotenv.config();
const CLIENT_URL = "http://localhost:3000/";

const app = express();
const PORT = 5000;

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

app.get('/auth/google/', passport.authenticate('google', { scope: ["profile"], failureRedirect: '/auth/login', successRedirect: '/' }));
app.get(
  "/oauth/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/auth/login/failed",
  })
);

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack)
  res.status(500).send('An error occurred')
});

app.get("/auth/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});
app.get("/auth/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});
app.get("/auth/logout", (req: Request, res: Response) => {
  req.logout({ keepSessionInfo: false }, () => {})
  res.redirect(CLIENT_URL);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});