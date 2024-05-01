const express = require('express');
const logger = require('./middleware/logger');
const validator = require('./middleware/validator');
const handle404 = require('./error-handlers/404');
const handle500 = require('./error-handlers/500');

const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.get('/person', validator, (req, res, next) => {
  const { name } = req.query;
  res.json({ name });
});

// Error handlers
app.get('*', handle404);
app.use(handle500);

module.exports = {
  app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  },
};
