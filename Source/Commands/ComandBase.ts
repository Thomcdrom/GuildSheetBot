import {Client} from 'discord.js';

export abstract class ComandBase {
    client :Client;

    constructor(client :Client){
        this.client = client;
    }  
}