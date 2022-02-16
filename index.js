const express = require('express');
// const fs = require('fs');
const fsAsync = require('fs/promises');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// Req: 1 - Create the endpoint GET /talker
async function getTalkerResponse(_req, res) {
  const FILENAME = './talker.json';

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
  const FILENAME = './talker.json';
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

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});