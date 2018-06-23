#!/usr/bin/env node
'use strict';
const express = require("express");
exports.r2gSmokeTest = function () {
    return true;
};
const app = express();
app.use(function (req, res, next) {
    res.json({ success: true });
});
app.use(function (err, req, res, next) {
    err && console.error(err.message || err);
    if (!res.headersSent) {
        setTimeout(function () {
            if (!res.headersSent) {
                res.json({ error: 'hit final error middleware', value: err && err.stack || err || null });
            }
        }, 10);
    }
});
app.listen(6969, function () {
    console.log('app is listening.');
});
