const express = require('express');
const clients = require('../services/clients');
const router = express.Router();

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await clients.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting clients `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
    try {
      res.json(await clients.create(req.body));
    } catch (err) {
      console.error(`Error while creating a client`, err.message);
      next(err);
    }
  });

/* PUT programming language */
router.put('/:id', async function(req, res, next) {
    try {
      res.json(await clients.update(req.params.id, req.body));
    } catch (err) {
      console.error(`Error while updating client`, err.message);
      next(err);
    }
  });
 
/* DELETE programming language */
router.delete('/:id', async function(req, res, next) {
    try {
      res.json(await clients.remove(req.params.id));
    } catch (err) {
      console.error(`Error while deleting client`, err.message);
      next(err);
    }
  });

module.exports = router;