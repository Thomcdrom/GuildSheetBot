import { GdocAutenticate } from './Autenticate';
import { google } from 'googleapis';
import { User } from 'discord.js';

export class Signup extends GdocAutenticate {

    user :User;
    value :string;

    constructor(user :User ,value :string) {
        super();
        this.user = user;
        this.value = value;

        this.authenticate();
    }

    run() {
        const auth = this.authenthication;

        console.log(auth);

        const sheets = google.sheets({version: 'v4', auth });
        sheets.spreadsheets.values.get({
            spreadsheetId: this.sheetId,
            range: "rooster!B1:B",
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const rows = res.data.values;
            if (rows.length) {
            console.log('Name, Major:');
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
                console.log(`${row[0]}, ${row[4]}`);
            });
            } else {
            console.log('No data found.');
            }
        });
    }
}