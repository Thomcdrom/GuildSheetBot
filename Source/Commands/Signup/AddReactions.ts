import { ComandInterface } from '../ComandInterface';
import { ComandBase } from '../ComandBase';
import { Client, Message } from 'discord.js';


export class AddReactions extends ComandBase implements ComandInterface {

    private message :Message

    constructor(client :Client, message: Message){
        super(client);
        this.message = message
    }  

    public run() {
            this.message.react('✅')
            .then(text=>{this.message.react('❎')
            .then(text=>{this.message.react('❓')})
            });
    }
}
