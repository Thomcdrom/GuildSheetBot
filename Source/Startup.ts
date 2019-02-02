import * as discord from 'discord.js';
import {AddReactions} from '../Source/Commands/Signup/AddReactions'

export class Startup {
      client: discord.Client

    constructor(botkey :string, sheetkey :string) {
        this.client = new discord.Client();
        this.client.login(botkey).catch(() => {console.error('Your discord bot key isn\'t valid')});
        
        this.ready();
    }  
    private ready() {
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
            this.message();
        });
    }
    
    private message() {
        this.client.on('message', message => {

            switch (true) {
                case message.content ==='ping':
                    message.reply('Pong!');
                break;
                case message.content.includes('node war'):
                   const reaction = new AddReactions(this.client, message);

                   reaction.run();
                break;
            }

          });
    }

    
    
}