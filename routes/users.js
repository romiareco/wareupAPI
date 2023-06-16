const express = require('express');
const users = require('../services/usersService');
const router = express.Router();

router.get('/', async function(req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
    try {
      res.json(await users.create(req.body));
    } catch (err) {
      console.error(`Error while creating a user`, err.message);
      next(err);
    }
  });

router.post('/recover-password', async function(req, res, next) {
    try {
      res.json(await users.recoverPassword(req.body.email));
    } catch (err) {
      console.error(`Error recovering the password `, err.message);
      next(err);
    }
  });

router.put('/:id', async function(req, res, next) {
    try {
      res.json(await users.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating user`, err.message);
      next(err);
    }
  });
 
/* DELETE programming language
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await users.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting user`, err.message);
      next(err);
    }
  });
 */

module.exports = router;