const router = require('express').Router();
const Accounts = require('./accounts-model');
const {
  checkAccountPayload,
  checkAccountId,
} = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  // DO YOUR MAGIC

  Accounts.getAll()
    .then((accounts) => {
      res.status(200).json(accounts);
    })
    .catch(next);
});

router.get('/:id', checkAccountId, (req, res, next) => {
  res.status(200).send(req.account);
});

router.post('/', checkAccountPayload, (req, res, next) => {
  Accounts.create(req.body)
    .then((account) => {
      console.log(account);
      res.status(200).json(account);
    })
    .catch(next);
});

router.put('/:id', checkAccountPayload, checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.updateById(req.params.id, req.body)
    .then((account) => {
      console.log(req.body);
      res.status(200).json(req.body);
    })
    .catch(next);
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  Accounts.deleteById(req.params.id)
    .then((account) => {
      res.status(200).json(req.body);
    })
    .catch(next);
});

// **********PUT ROUTER.USE AS SERVER.USE IN SERVER.JS FILE****
router.use((err, req, res, next) => {
  // eslint-disable-line
  // DO YOUR MAGIC
});

module.exports = router;
