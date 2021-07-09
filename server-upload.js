const express = require('express')
const multer = require('multer')
const splitFile = require('split-file')
const replaceString = require('replace-string')
const fs = require('fs')
//const JSZip = require('jszip')
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const { getAudioDurationInSeconds } = require('get-audio-duration');



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
  
   getAudioDurationInSeconds('uploads/name.mp3').then((duration) => {
         console.log(Math.floor(duration))
             

  
  let time =  Math.floor(Math.floor(duration) / req.body.num)
  console.log(time)

  let save_dir = 'uploads'
  ffmpeg('uploads/name.mp3').outputOptions('-f segment')
  .outputOptions(`-segment_time ${time}`).save(`${save_dir}/%1d.mp3`)
 
});
    return res.send('s')

})

/* 
async function rename2(){
   let files = fs.readdirSync('./uploads')
   for (const file of files) {
    if (file===file) {
        
        console.log(file.pathname)
        
    }
  }

}
rename2() */






app.use('/files', express.static('uploads'))




const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

const n = p.replace(p, 'goose')

console.log(n);


app.listen(1000, ()=>console.log('hey'))