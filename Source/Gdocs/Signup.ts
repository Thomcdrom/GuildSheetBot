import { GdocAutenticate } from './Autenticate';
import { User, Message } from 'discord.js';
import { OAuth2Client } from 'googleapis-common';
import { FindPlayer } from './Util/FindPlayer';
import { UpdateData } from './Util/UpdateData';

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

        const player = await findPlayer.find(auth, this.offset, this.user);
        console.log(player);

        if (!player) {
            let day :string;
            const content = this.message.content.toLowerCase();

            switch(true) {
                case (content.indexOf('monday') > -1):
                    day = 'M';
                break;
                case (content.indexOf('sunday') > -1):
                    day = 'L';
                break;
                case (content.indexOf('friday') > -1):
                    day = 'K';
                break;
            }
            if (updatePlayer.update(auth, id, player, this.offset, day, this.value)) {
                console.log(`${this.user.username} has changed his status to ${this.value}` )
            }

        } else {
            this.user.send("I couldn't find your name on you magical sheet. Please contact a officer so they can help me out, and so you can signup!");
        }
    }
}