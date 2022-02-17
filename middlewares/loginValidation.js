// base site: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript

function emailValidation(req, res, next) {
  const { email } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const testEmail = emailRegex.test(String(email).toLowerCase());

  if (!email || email === '') {
  return res.status(400).json({
     message: 'O campo "email" é obrigatório' }); 
  } if (testEmail === false) {
    return res.status(400).json({
        message: 'O "email" deve ter o formato "email@email.com"',
      }); 
  }
  return next();
}

function passwordValidation(req, res, next) {
  const { password } = req.body;

  if (!password || password === '') {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório' });
  } if (password.length < 6) {
    return res.status(400).json({
        message: 'O "password" deve ter pelo menos 6 caracteres' }); 
  }
  return next();
}

module.exports = { emailValidation, passwordValidation };