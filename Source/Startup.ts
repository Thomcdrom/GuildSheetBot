import * as discord from 'discord.js';

export class Startup {
      client: discord.Client

    constructor(botkey :string, sheetkey :string) {
        this.client = new discord.Client();
        this.client.login(botkey).catch(() => {console.error('Your discord bot key isn\'t valid')});
        
        this.read();
    }  
    private read() {
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
        });
    }
}