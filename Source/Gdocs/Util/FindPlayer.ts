import { google } from 'googleapis';
import { User } from 'discord.js';
import { OAuth2Client } from 'googleapis-common';

export class FindPlayer {

    public find(auth: OAuth2Client, offset: number, user: User) {
        const sheets = google.sheets({version: 'v4', auth });

        sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: `Thoms rooster extravaganza!B${offset}:B72`,
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const rows = res.data.values;
            if (rows.length) {
            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row, count) => {
                if (user.username.toLowerCase() === row[0].toLowerCase()) {
                    return count+offset;
                }
            });
            } else {
            console.log('No data found.');
            }
        });
    }
}