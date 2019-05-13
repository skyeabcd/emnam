const commando = require('discord.js-commando');
const {Wit, log} = require('node-wit');
const {wit_ai_token} = require('../../get_config');
const wit_client = new Wit({
    accessToken: wit_ai_token,
    logger: new log.Logger(log.DEBUG) // optional
});
const lines = require('../../lines.json');
const intent_respond = {
  text: ["calling","swear", "name_get", "greeting", "empty", "unknown"]
}
module.exports = class chatCommand extends commando.Command {
  constructor(client) {
      super(client, {
          name: 'chat',
          group: 'fun',
          memberName: 'chat',
          description: 'Meo meo.',
      });
  }

  async run(message, args) {
    var rep = "uk";
    if (!args.length){
      rep = this.getRandom(lines["empty"]);
    }
    else{
      var res = await wit_client.message(args , {});
      //console.log(res);
      if(res.entities.intent)
      {
        var intent = res.entities.intent[0].value
        rep = this.getRandom(lines[intent]);
      }
      else
        rep = this.getRandom(lines["unknown"]);
    }
    if(intent_respond.text.indexOf(intent) >= 0){
      console.log(`Send text: ${rep}`)
      message.reply(rep);
    }
  }
  getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

}
