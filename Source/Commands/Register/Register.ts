import { ComandInterface } from '../ComandInterface';
import { ComandBase } from '../ComandBase';
import { Client, DMChannel, Message } from 'discord.js';
import { FetchMessage } from '../Util/FetchMessage';

export class Register extends ComandBase implements ComandInterface {

    private channel :DMChannel;
    private message :Message;
    private fetchMessage : FetchMessage;

    private messageChain :string[] = ["What is your Family name?", "What is the name of your main character?", "What class do you play?", "What is your AP?", "What is your AAP?", "What is your DP?"];

    constructor(client :Client, message: Message){
        super(client);
        this.channel = <DMChannel> message.channel;
        this.message = message;

        this.fetchMessage = new FetchMessage(this.client, this.channel);
    }  

     public async run() {
        this.channel.startTyping();
        
        const message = await this.fetchMessage.findLastBotMessage(this.message.id)
        let userMessage;

        for (let i = 0; i <= this.messageChain.length; i++){
            if (message.content === this.messageChain[i]) {
                userMessage = await this.fetchMessage.findUserMessageAfter(message.id);
                userMessage = userMessage.content;

                this.channel.stopTyping();
                this.channel.send(this.messageChain[i + 1]);
                return;
            } 
        }

        this.channel.stopTyping();
        this.channel.send("I didn't find our previous conversation. Please contact a officer to manual forfill your request.");
    }
}
