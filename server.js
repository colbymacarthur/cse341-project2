const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Colby MacArthur - CSE 341 - Week 3 and 4');
});

port = 3000;
app.listen(process.env.PORT || port, () => {
    console.log(`Server running on port ${port}`);
})