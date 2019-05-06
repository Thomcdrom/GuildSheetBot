import { ComandInterface } from '../ComandInterface';
import { ComandBase } from '../ComandBase';
import { Client, DMChannel, Message } from 'discord.js';

export class Register extends ComandBase implements ComandInterface {

    private channel :DMChannel;
    private message :Message;

    private messageChain :string[] = ["What is your Family name?", "What is the name of your main character?", "What class do you play?", "What is your AP?", "What is your AAP?", "What is your DP?"];

    constructor(client :Client, message: Message){
        super(client);
        this.channel = <DMChannel> message.channel;
        this.message = message;
    }  

     public async run() {
        this.channel.startTyping();
        
        const message = await this.findLastBotMessage(this.message.id)
        let userMessage;

        for (let i = 0; i <= this.messageChain.length; i++){
            if (message.content === this.messageChain[i]) {
                userMessage = await this.findUserMessageAfter(message.id);
                userMessage = userMessage.content;
            } 
        }
        if (!userMessage) userMessage = "I didn't find our previous conversation. Please contact a officer to manual forfill your request.";

        this.channel.stopTyping();
        this.channel.send(userMessage);
    }

    private async findLastBotMessage(id :string) :Promise<Message> {
        return new Promise<Message>(async (resolve) => {
            let message = await this.fetchSendMessageBefore(id);

            if (message.author.id !== this.client.user.id) {
                message = await this.findLastBotMessage(message.id);
            } 

            resolve(message);
        });   
    }

    private async findUserMessageAfter(id :string) :Promise<Message> {
        return new Promise<Message>(async (resolve) => {
            let message = await this.findUserMessageAfter(id);

            if (message.author.id === this.client.user.id) {
                message = await this.fetchSendMessageAfter(message.id);
            } 

            resolve(message);
        });   
    }

    private async fetchSendMessageAfter(id :string) :Promise<Message> {
        return new Promise<Message>(async (resolve) => {
            const settings = {
                limit: 1,
                after: id
            };
            let messages = await this.channel.fetchMessages(settings);
            resolve(messages.last());
        });
    }

    private async fetchSendMessageBefore(id :string) :Promise<Message> {
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
