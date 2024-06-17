const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const loginHandler = require('./handler/login-handler');
const registerHandler = require('./handler/register-handler');
const userHandler = require('./handler/user-handler');
const productHandler = require('./handler/product-handler');
const farmHandler = require('./handler/farm-handler');
const cartHandler = require('./handler/cart-handler');
const checkoutHandler = require('./handler/checkout-handler');
const historyHandler = require('./handler/history-handler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Farm Fresh API');
});

app.use('/api', loginHandler);
app.use('/api', registerHandler);
app.use('/api', userHandler);
app.use('/api', productHandler);
app.use('/api', farmHandler);
app.use('/api', cartHandler);
app.use('/api', checkoutHandler);
app.use('/api', historyHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
