import { ComandInterface } from '../ComandInterface';
import { ComandBase } from '../ComandBase';
import { Client, DMChannel, Message } from 'discord.js';

export class Register extends ComandBase implements ComandInterface {

    private channel :DMChannel
    private message :Message

    constructor(client :Client, message: Message){
        super(client);
        this.channel = <DMChannel> message.channel;
        this.message = message;
    }  

     public async run() {
        this.channel.startTyping();
        
        const message = await this.findLastBotMessage(this.message.id)

        this.channel.stopTyping();
        this.channel.send(message.content);
    }

    private async findLastBotMessage(id :string) :Promise<Message> {
        return new Promise<Message>(async (resolve) => {
            let message = await this.fetchSendMessage(id);

            if (message.author.id !== this.message.client.user.id) {
                message = await this.findLastBotMessage(message.id);
            } 

            resolve(message);
        });   
    }

    private async fetchSendMessage(id :string) :Promise<Message> {
        return new Promise<Message>(async (resolve) => {
            const settings = {
                limit: 1,
                before: id
            };
            let messages = await this.channel.fetchMessages(settings);
            resolve(messages.last());
        });
    }
}
