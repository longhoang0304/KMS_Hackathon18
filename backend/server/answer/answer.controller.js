import Model from './answer.model';
import Question from '../question/question.model'
/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @param {*} id
 * Load single model
 */
async function load(req, res, next, id) {
  try {
    const model = await Model.get(id);
    req.model = model;
    return next();
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({
      message: error.message,
    });
  }
}

/**
 *
 * @param {*} req
 * @param {*} res
 * Get model
 */
function get(req, res) {
  return res.json(req.model);
}

async function update(req, res) {
  const { model } = req;
  let savedmodel = null;

  model.modelname = req.body.modelname;

  try {
    savedmodel = await model.save();
    return res.json(savedmodel);
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({
      message: error.message,
    });
  }
}

async function create(req, res) {
  const model = new Model({
    ...req.body,
  });

  // code here
  console.log(req.files[0]);
  //var b64string = model.content
  const buf = req.files[0].buffer;

  var b64string = buf.toString('base64');

  // console.log(buf.toString('base64'));
  const fs = require('fs');
  fs.writeFileSync("audio.3gp", buf);
  // CONVERT FILE
  const ffmpeg = require('fluent-ffmpeg');

  let track = 'audio.3gp'; //your path to source file

  ffmpeg(track)
  .toFormat('wav')
  .on('error', (err) => {
    console.log('An error occurred: ' + err.message);
  })
  .on('progress', (progress) => {
    // console.log(JSON.stringify(progress));
    console.log('Processing: ' + progress.targetSize + ' KB converted');
  })
  .on('end', (stdout) => {
    console.log('Processing finished !');

    //GOOGLE API
  //const fs = require('fs');
  const fileName = 'audio.wav';
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString('base64');

  //const audioBytes = b64string;

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes,
  };

  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 8000,
    languageCode: 'vi-VN'    
  };

  const request = {
    audio: audio,
    config: config,
  };

  const speech = require('@google-cloud/speech');
  const client = new speech.SpeechClient();

// Detects speech in the audio file
  client
    .recognize(request)
    .then(async data => {
      const response = data[0];
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
      console.log(`Transcription: ${transcription}`);

      // judge in here
      // 1. convert to lowercase
      const msg = transcription.toLowerCase();
      // 2. get question
      let curQuestion = await Question.get( req.body.questionId );
      let listKeyOfQuestion = curQuestion.keyword;


      let score = 100;
      let minus = Math.floor(100 / listKeyOfQuestion.length)

      for (let index = 0; index <  listKeyOfQuestion.length; index++  ) {

          let key = listKeyOfQuestion[index].toLowerCase();
          if (!msg.includes(key))
              score -= minus;
      }

     

      try {
          model.score = score;
          model.content = msg;
         const newmodel = await model.save();
         return res.json(newmodel);
       } catch (error) {
         const status = error.status || 500;
         return res.status(status).json({
           message: error.message,
         });
       }

    })
    .catch(err => {
      console.error('ERROR:', err);
    });/* */
  })
  .save('audio.wav');//path where you want to save your file

  
  
}


async function list(req, res) {
  const { limit = 50, skip = 0 } = req.query;
  try {
    const modelList = await Model.list({ skip, limit });
    return res.json(modelList);
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({
      message: error.message,
    });
  }
}

async function remove(req, res) {
  const { model } = req;
  try {
    const deletedmodel = await model.remove();
    return res.json(deletedmodel);
  } catch (error) {
    const status = error.status || 500;
    return res.status(status).json({
      message: error.message,
    });
  }
}

export { load, get, list, update, create, remove };