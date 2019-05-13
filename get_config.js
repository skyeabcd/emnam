var config
try {
    config = require('./config.json');
}catch(error){
    config = {
        "prefix": "n!",
        "token": process.env.BOT_TOKEN,
        "wit_ai_token":  process.env.WIT_TOKEN
    } 
}
module.exports = config