import { GdocAutenticate } from './Autenticate';
import { google } from 'googleapis';
import { User } from 'discord.js';
import { OAuth2Client } from 'googleapis-common';

export class Signup extends GdocAutenticate {

    user :User;
    value :string;

    constructor(user :any ,value :string) {
        super();
        this.user = user;
        this.value = value;

        this.run = this.run.bind(this);

        this.authenticate();
    }

    run(auth: OAuth2Client, id :string) {
        const sheets = google.sheets({version: 'v4', auth });

        sheets.spreadsheets.values.get({
            spreadsheetId: id,
            range: "rooster!B1:C72",
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const rows = res.data.values;
            if (rows.length) {
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
                this.user.lastMessage.channel.sendMessage(`${row[0]}, ${row[1]}`);
            });
            } else {
            console.log('No data found.');
            }
        });
    }
}