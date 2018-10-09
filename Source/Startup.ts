import * as discord from 'discord.js';

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
        this.client.on('message', msg => {
            console.log("message");
            if (msg.content === 'ping') {
              msg.reply('Pong!');
            }
          });
    }

    
}