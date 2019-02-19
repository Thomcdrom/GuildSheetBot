import { GdocAutenticate } from './Autenticate';
import { google } from 'googleapis';
import { User } from 'discord.js';
import { OAuth2Client } from 'googleapis-common';
import { FindPlayer } from './Util/FindPlayer';

export class Signup extends GdocAutenticate {

    user :User;
    value :string;
    offset :number = 2;

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
            range: `Thoms rooster extravaganza!B${this.offset}:B72`,
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const rows = res.data.values;
            if (rows.length) {
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row, count) => {
                if (this.user.username.toLowerCase() === row[0].toLowerCase()) {
                    let day :string;
                    const content = this.user.lastMessage.content.toLowerCase();

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
                    var range = `Thoms rooster extravaganza!${day}${count+this.offset}`;
                    var valueInputOption = 'USER_ENTERED';
                    var resource = [['Y']];

                    console.log(range);

                    var request = {
                        spreadsheetId: id,  

                        range: range,
                        
                        valueInputOption: valueInputOption,
                        
                        resource: {
                            values: resource
                        },
                    };

                        sheets.spreadsheets.values.update(request, function(err, response) {
                            if (err) {
                            console.error(err);
                            return;
                        }
                        
                        // TODO: Change code below to process the `response` object:
                        console.log(JSON.stringify(response, null, 2));
                        });
                }
            });
            } else {
            console.log('No data found.');
            }
        });
    }
}