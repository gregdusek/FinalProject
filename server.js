const express = require('express')
const app = require('./backend-api/app');
const path = require('path')
app.use(express.static('build'))


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'build/index.html'))
})
app.listen(process.env.PORT)