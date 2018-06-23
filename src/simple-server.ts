#!/usr/bin/env node
'use strict';

import {ErrorRequestHandler} from "express";
import * as express from 'express';
import haven from 'domain-haven';

export const r2gSmokeTest = function () {
  // r2g command line app uses this exported function
  return true;
};

const app = express();

app.use(function (req, res, next) {
  res.json({success: true});
});

app.use(function (err, req, res, next) {
  err && console.error(err.message || err);
  if (!res.headersSent) {
    setTimeout(function () {
      if (!res.headersSent) {
        res.json({error: 'hit final error middleware', value: err && err.stack || err || null})
      }
    }, 10);
  }

});

app.listen(6969, function () {
  console.log('app is listening.');
});
