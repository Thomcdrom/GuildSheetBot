import {Client} from 'discord.js';

export interface CommandInterface {
     
    client:Client;
    run();
}
