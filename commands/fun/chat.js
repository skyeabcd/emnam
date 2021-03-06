const commando = require('discord.js-commando');
const {Wit, log} = require('node-wit');
const fs = require('fs')
const lines = require('../../lines.json');
const {wit_ai_token} = require('../../get_config');

var filename = "hinhtihon.txt"
try{
    var data = fs.readFileSync(filename, 'utf8')
}catch(err){
    console.log(err)
}
const images = data.split('\n')
console.log("Loaded images:" + images)
const intent_respond = {
  text: ["calling","swear", "name_get", "greeting", "empty", "unknown"],
  image: ["calling", "name_get"]
}
const wit_client = new Wit({
  accessToken: wit_ai_token,
  logger: new log.Logger(log.DEBUG) // optional
});    
module.exports = class UnknownCommandCommand extends commando.Command {
  constructor(client) {
      super(client, {
        name: 'c',
        group: 'fun',
        memberName: 'chat',
        description: 'Meo meo.',
        unknown: true,
        hidden: true
      });
     
  }

  async run(message, args) {
    var rep = "uk";
    var intent = "unknown";
    if (!args.length){
      rep = await this.getRandom(lines["empty"]);
    }
    else{
      var res = await wit_client.message(args , {});
      //console.log(res);
      if(res.entities.intent)
      {
        intent = res.entities.intent[0].value
        rep = await this.getRandom(lines[intent]);
      }
      else
        rep = await this.getRandom(lines["unknown"]);
    }
    var options = {}
    if(intent_respond.text.indexOf(intent) >= 0){
      console.log(`Send text: ${rep}`)
    }
    if(intent_respond.image.indexOf(intent) >= 0){
      var file = await this.getRandom(images)
      console.log(`Send file: ${file}`)
      options["files"]  = [file];
    }
    message.reply(rep, options)
  }
  getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

}