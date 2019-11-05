const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');



app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));