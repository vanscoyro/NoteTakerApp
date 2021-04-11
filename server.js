const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

require('./routes/api')(app);
require('./routes/html')(app);

app.listen(PORT, () => console.log(`App listening on Port ${PORT}`));

