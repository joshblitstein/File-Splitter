const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);


let save_dir = 'uploads'
var command = ffmpeg('uploads/name.mp3').outputOptions('-f segment')
.outputOptions(`-segment_time 3`).save(`${save_dir}/%1d.mp3`)

