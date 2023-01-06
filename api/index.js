//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Syncing all the models at once.
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios');
const dot = require('dotenv')

dot.config()
axios.defaults.baseURL = 'http://localhost:3031'; //deafults era

var local = "";

if(process.env.PORT == 3031){
  local = "http://localhost:3031";
}else{
  local = "error";
  //local = "https://videogames-pi-henry.herokuapp.com";
}

// Syncing all the models at once.
console.log(process.env.PORT)
conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('\x1b[33m%s\x1b[0m', 'server listening at ' + process.env.PORT); // eslint-disable-line no-console
  });
});

