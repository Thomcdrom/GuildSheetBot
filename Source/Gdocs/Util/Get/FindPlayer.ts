import { google } from 'googleapis';
import { User } from 'discord.js';
import { OAuth2Client } from 'googleapis-common';

export class FindPlayer {

     public find (auth: OAuth2Client, offset: number, user: User) :Promise<number> {
        const sheets = google.sheets({version: 'v4', auth });

        const options = {
            spreadsheetId: process.env.SHEET_ID,
            range: `Thoms rooster extravaganza!B${offset}:B72`,
        };

        return new Promise<number>((resolve, reject) => {
            sheets.spreadsheets.values.get(options, (err, res) => {
                if (err) return console.log('The API returned an error: ' + err);
                    const rows = res.data.values;
                    
                    if (rows.length) {
    
                    rows.map((row, count) => {
                        if (user.username.toLowerCase() === row[0].toLowerCase()) {
                            resolve(count+offset);
                        }
                    });
                } else {
                    reject('No player data found.');
                }
            });
        });
    }
}