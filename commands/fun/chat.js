const commando = require('discord.js-commando');
const {Wit, log} = require('node-wit');
const {wit_ai_token} = require('../../config.json');
const wit_client = new Wit({
    accessToken: wit_ai_token,
    logger: new log.Logger(log.DEBUG) // optional
  });

  module.exports = class cCommand extends commando.Command {
    constructor(client) {
        super(client, {
            name: 'chat',
            group: 'fun',
            memberName: 'chat',
            description: 'Meo meo.',
        });
    }

    async run(message, args) {
        if (!args.length){
            message.channel.send("Nói gì đi.");
            return;
        }
        else{
            var res = await wit_client.message(args , {})
            console.log(res);
            if(res.entities)
            {
              var intent = res.entities.intent[0].value
              // console.log(intent);
              if(intent === "greeting")
                message.reply(`Chào @<${message.author.id }> :). `);
              else if(intent === "name_get")
                message.reply(`Mình tên là Nấm @<${message.author.id }> .<:bua:>`);
              else
                message.reply(`Uk`);
            }
            else
              message.reply(`Uk`);

            // const bua = client.emojis.find(emoji => emoji.name === "ayy");
            //message.reply(`${ayy} LMAO`);

            // res.then((data) => {
            //         message.channel.send(data.entities)
            //     })
            //     .catch(console.error);
            // }
        }
    }

}
