import { ComandInterface } from '../ComandInterface';
import {Client} from 'discord.js';

export class Reset implements ComandInterface{
    client:Client;

    constructor(client :Client){
        this.client = client;
    }  

    public run() {
        
    }
}
