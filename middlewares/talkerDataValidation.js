// base site: https://www.delftstack.com/pt/howto/javascript/javascript-validate-date/

function auth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  } if (req.headers.authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  return next();
}

function nameValidation(req, res, next) {
  const { name } = req.body;

  if (!name || name === '') {
  return res.status(400).json({
     message: 'O campo "name" é obrigatório' }); 
  } if (name.length < 3) {
    return res.status(400).json({
        message: 'O "name" deve ter pelo menos 3 caracteres',
      }); 
  }
  return next();
}

function ageValidation(req, res, next) {
  const { age } = req.body;

  if (!age || age === '') {
    return res.status(400).json({
       message: 'O campo "age" é obrigatório' }); 
    } if (Number(age) < 18) {
      return res.status(400).json({
          message: 'A pessoa palestrante deve ser maior de idade',
        }); 
    }
  return next();
}

function talkValidation(req, res, next) {
  const { talk } = req.body;

  if (!talk || talk.watchedAt === undefined || talk.rate === undefined) {
    return res.status(400).json({
        message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
      });
    }
    return next();
}

function dateAndRateValidation(req, res, next) {
  const { talk: { watchedAt, rate } } = req.body;
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

  function rateValidation() {
    if (!Number.isInteger(Number(rate)) || Number(rate) < 1 || Number(rate) > 5) {
      return res.status(400).json({
        message: 'O campo "rate" deve ser um inteiro de 1 à 5' }); 
      }
    return next();
  }
    if (!dateRegex.test(watchedAt)) {
      return res.status(400).json({
         message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
      } 
      return rateValidation();
}

module.exports = { 
  auth,
  nameValidation,
  ageValidation,
  talkValidation,
  dateAndRateValidation,
};
