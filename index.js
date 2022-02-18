const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// const fs = require('fs');
const fsAsync = require('fs/promises');
const crypto = require('crypto');

const { emailValidation, passwordValidation } = require('./middlewares/loginValidation');
const { 
  auth,
  nameValidation,
  ageValidation,
  dateAndRateValidation,
  talkValidation,
 } = require('./middlewares/getTalkerData');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const FILENAME = './talker.json';

// Req: 1 - Create the endpoint GET /talker
async function getTalkerResponse(_req, res) {
try {
    const talkerData = await fsAsync.readFile(FILENAME);
    return res.status(200).json(JSON.parse(talkerData));
  } catch (e) {
    return [];
  }
}

app.get('/talker', getTalkerResponse);
//

// Req: 2 - Create the endpoint GET /talker/:id
async function getTalkerByIdResponse(req, res) {
  const talkerData = await fsAsync.readFile(FILENAME);
  const talkerDataArray = JSON.parse(talkerData);
  const { id } = req.params;
  const findId = talkerDataArray.find((data) => Number(data.id) === parseInt(id, 10));

  if (!findId) {
    return res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      }); 
  }

  return res.status(200).json((findId));
}

app.get('/talker/:id', getTalkerByIdResponse);
//

// Req: 3 - Create the POST endpoint /login
function postLogin(_req, res) {
  const token = crypto.randomBytes(8).toString('hex');

  return res.status(200).json({ token });
}
app.post('/login', emailValidation, passwordValidation, postLogin);
//

// Req: 4 - Create the POST endpoint /talker
async function postTalker(req, res) {
  const talkerData = await fsAsync.readFile(FILENAME);
  const talkerDataArray = JSON.parse(talkerData);
  const { name, age, talk } = req.body;
  const id = talkerDataArray.length + 1;
  const talkerObj = { name, id, age, talk };

  talkerDataArray.push(talkerObj);
  await fsAsync.writeFile(FILENAME, JSON.stringify([...talkerDataArray, talkerObj]));

  return res.status(201).json(talkerObj);
}
  app.post(
  '/talker',
  auth,
  nameValidation,
  ageValidation,
  talkValidation,
  dateAndRateValidation,
  postTalker,
);
//

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});