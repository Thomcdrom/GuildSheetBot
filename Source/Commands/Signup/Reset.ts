import { CommandInterface } from '../ComandInterface';
import {Client} from 'discord.js';

export class Reset implements CommandInterface{
    client:Client;

    constructor(client :Client){
        this.client = client;
    }  

    public run() {
        
    }
}
