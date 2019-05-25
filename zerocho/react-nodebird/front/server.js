const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressCookie = require('express-session');
const dotenv = require('dotenv');

const dev = process.env.NODE_ENV !== 'production';

const app = next({
  dev,
});

const handle = app.getRequestHandler();

dotenv.config();

app.prepare().then(() => {
  const server = express();

  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(
    expressCookie({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    }),
  );

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3060, () => {
    console.log("next+express running on post 3060")
  });
});
