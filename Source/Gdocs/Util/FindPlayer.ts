import { google } from 'googleapis';
import { User } from 'discord.js';
import { OAuth2Client } from 'googleapis-common';

export class FindPlayer {

     public async find (auth: OAuth2Client, offset: number, user: User) :Promise<number> {
        const sheets = google.sheets({version: 'v4', auth });

        sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: `Thoms rooster extravaganza!B${offset}:B72`,
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
                const rows = res.data.values;
                
                if (rows.length) {

                rows.map((row, count) => {
                    if (user.username.toLowerCase() === row[0].toLowerCase()) {
                        return count+offset;
                    }
                });
            } else {
                console.log('No data found.');
            }
        });
        return null;
    }
}