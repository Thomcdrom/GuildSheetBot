import * as discord from 'discord.js';

export class Startup {
      client: discord.Client

    constructor(botkey :string, sheetkey :string) {
        try{
        this.client = new discord.Client();
        this.client.login(botkey);
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
        });
        }
        catch {
            console.error('You provided a wrong bot token or and bad SheetsAPI token ');
        }
    }  
}