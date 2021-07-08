const express = require('express')
const multer = require('multer')
const splitFile = require('split-file')
const replaceString = require('replace-string')
const fs = require('fs')


const storage = multer.diskStorage({

    destination: (req, file, cb) =>{
            cb(null, 'uploads')
    },
    filename: (req, file, cb) =>{
        const { originalname } = file;
        cb(null, `name.mp3`)
        
    }
})
const upload = multer( { storage: storage });
const app = express();

app.use(express.static('public'))

app.post('/upload', upload.single('ok'), async (req, res) =>{
   
    
    await splitFile.splitFile(__dirname + '/uploads/name.mp3', req.body.num)
    .then((names) => {
        names.forEach((name)=>{
            let n = name.replace(name, 'l')
           return n;
        })
    })
    .catch((err) => {
      console.log('Error: ', err);
    });


    return res.json({ status: "buns"})

})




const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

const n = p.replace(p, 'goose')

console.log(n);


app.listen(1000, ()=>console.log('hey'))