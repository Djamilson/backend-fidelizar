import app from './app';

app.listen(process.env.PORT || 3000, () => {
  // const ip = require('ip');
  // console.log(ip.address());
   console.log('Iniciou o server com sucesso');
});
