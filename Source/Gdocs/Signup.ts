import { GdocAutenticate } from './Autenticate';
import { User, Message } from 'discord.js';
import { OAuth2Client } from 'googleapis-common';
import { FindPlayer } from './Util/Get/FindPlayer';
import { UpdateData } from './Util/UpdateData';
import { FindDay } from './Util/Get/FindDay';

export class Signup extends GdocAutenticate {

    user :User;
    message :Message;
    value :string;
    offset :number = 2;

    constructor(user :User , message :Message ,value :string) {
        super();

        this.user = user;
        this.message = message;
        this.value = value;

        this.run = this.run.bind(this);

        this.authenticate();
    }

    public async run(auth: OAuth2Client, id :string) {
        const findPlayer =  new FindPlayer();
        const updatePlayer = new UpdateData();
        const findDay = new FindDay();

        const player = await findPlayer.find(auth, this.offset, this.user);

        if (player) {
            let day :string;
            const content = this.message.content.toLowerCase();
            const days = await findDay.findDay(auth);
            
            for (let i = 0; i < days.length; i++) {
                console.log(days[i]);
                if (content.indexOf(days[i].getDay()) > -1) {
                    day = days[i].getRow();
                    break;
                }
            }

            if (updatePlayer.update(auth, id, player, this.offset, day, this.value)) {
                console.log(`${this.user.username} has changed his status to ${this.value}`);
            }

        } else {
            this.user.send("I couldn't find your name on you magical sheet. Please contact a officer so they can help me out, and so you can signup!");
        }
    }
}