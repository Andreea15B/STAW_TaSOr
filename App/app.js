const express = require('express');
const app = express();
const PORT = 3000;

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));


app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));