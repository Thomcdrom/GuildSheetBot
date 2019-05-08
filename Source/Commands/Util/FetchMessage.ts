import { Client, Message, DMChannel } from 'discord.js';


export class FetchMessage {
    
    private client :Client;
    private channel :DMChannel

    constructor (client :Client, channel :DMChannel) {
        this.client = client;
        this.channel = channel;
    }
    
    public async findLastBotMessage(id :string) :Promise<Message> {
        return new Promise<Message>(async (resolve) => {
            let message = await this.fetchSendMessageBefore(id);

            if (message.author.id !== this.client.user.id) {
                message = await this.findLastBotMessage(message.id);
            } 

            resolve(message);
        });   
    }

    public async findUserMessageAfter(id :string) :Promise<Message> {
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