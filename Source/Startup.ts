import * as discord from 'discord.js';
import {AddReactions} from '../Source/Commands/Signup/AddReactions'
import { Signup } from './Gdocs/Signup';

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
            this.reaction();
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

    private reaction() {
        this.client.on('messageReactionAdd', (messageReaction, user) => {
            if (user.id !== this.client.user.id) {
                switch (messageReaction.emoji.name) {
                    case '✅':
                        new Signup(user, messageReaction.message, 'Y');
                    break;

                    case '❎':
                        new Signup(user, messageReaction.message, 'N');
                    break;

                    case '❓':
                        new Signup(user, messageReaction.message, 'L');
                    break;

                    default:
                        user.send('This emote isn\'t supported for signup. Please remove the emote from the signup message.');
                    break;
                }
            }
        }); 
    }

    
    
}