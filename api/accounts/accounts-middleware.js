const Accounts = require('./accounts-model');

function checkAccountPayload(req, res, next) {
  const { name, budget } = req.body;

  if (!name || !budget) {
    res.status(400).json({ message: 'name and budget are required' });
  } else if (typeof name !== 'string') {
    res.status(400).json({ message: 'name of account must be a string' });
  } else if (name.trim() < 3 || name.trim() > 100) {
    res
      .status(400)
      .json({ message: 'name of account must be between 3 and 100' });
  } else if (isNaN(budget)) {
    res.status(400).json({ message: 'budget of account must be a number' });
  } else if (budget < 0 || budget > 1000000) {
    res
      .status(400)
      .json({ message: 'budget of account is too large or too small' });
  } else {
    next();
  }
}

function checkAccountNameUnique(req, res, next) {
  const { name } = req.body;
  const trimmed = name.trim();
  const allAccounts = Accounts.getAll();

  const indexOfName = allAccounts.indexof(trimmed);
  if (indexOfName < 0) {
    res.status(400).json({ message: 'that name is taken' });
  } else {
    next();
  }
}

function checkAccountId(req, res, next) {
  const { id } = req.params;
  Accounts.getById(id)
    .then((account) => {
      if (account) {
        req.account = account;
        console.log('hello');
        next();
      } else if (!account) {
        next({ message: 'user not found', status: 404 });
      }
    })
    .catch(next);
}

module.exports = {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
};
