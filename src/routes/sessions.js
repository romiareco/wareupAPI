const express = require('express');
const sessions = require('../services/sessionService');
const router = express.Router();

router.post('/auth/login', async function(req, res, next) {
    try {
      res.json(await sessions.signup(req.body));
    } catch (err) {
      console.error(`Error while logging user`, err.message);
      next(err);
    }
  });


module.exports = router;