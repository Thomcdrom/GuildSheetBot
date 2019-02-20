import { GdocAutenticate } from './Autenticate';
import { google } from 'googleapis';
import { User, Message } from 'discord.js';
import { OAuth2Client } from 'googleapis-common';
import { Request } from './DTO/Request';

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

    run(auth: OAuth2Client, id :string) {
        const sheets = google.sheets({version: 'v4', auth });

        sheets.spreadsheets.values.get({
            spreadsheetId: id,
            range: `${process.env.TAB_NAME}!B${this.offset}:B72`,
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const rows = res.data.values;
            if (rows.length) {
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row, count) => {
                if (this.user.username.toLowerCase() === row[0].toLowerCase()) {
                    let day :string;
                    const content = this.message.content.toLowerCase();

                    switch(true) {
                        case (content.indexOf('monday') >-1):
                            day = 'M';
                        break;
                        case (content.indexOf('sunday') >-1):
                            day = 'L';
                        break;
                        case (content.indexOf('friday') >-1):
                            day = 'K';
                        break;
                    }
                    const request = new Request()

                    request.setSpreadsheetId(id);
                    request.setRange(`${process.env.TAB_NAME}!${day}${count+this.offset}`);
                    request.setValueInputOption('USER_ENTERED');
                    request.setValue(this.value);

                    sheets.spreadsheets.values.update(request.toObject(), function(err, response) {
                            if (err) {
                            console.error(err);
                            return;
                        }
                    });
                }
            });
            } else {
            console.log('No data found.');
            }
        });
    }
}