const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const multer = require('multer')

const app = express()
const PORT= 8080 || process.env.PORT;

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())

mongoose.connect(`mongodb+srv://${process.env.mongoPASS}:zfwB5USIUvKplQjv@cluster0.bezcq.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0`)
.then(result => console.log("Connected to mongodb"))


app.listen(PORT, () => {
    console.log(`APP listening on port ${PORT}`);
});
