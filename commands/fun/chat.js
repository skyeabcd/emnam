const commando = require('discord.js-commando');
const {Wit, log} = require('node-wit');
const {wit_ai_token} = require('../../config.json');
const wit_client = new Wit({
    accessToken: wit_ai_token,
    logger: new log.Logger(log.DEBUG) // optional
  });

  module.exports = class DogCommand extends commando.Command {
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
            // res.then((data) => {
            //         message.channel.send(data.entities)
            //     })
            //     .catch(console.error);
            // }
        }
    }

}