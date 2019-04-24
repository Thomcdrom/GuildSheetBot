import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import { Day } from '../../DTO/Day';

export class FindDay {
    
    public findDay(auth: OAuth2Client) :Promise<string> {
        const sheets = google.sheets({version: 'v4', auth });

        const alphabet = 'klm'.split('');

        const options = {
            spreadsheetId: process.env.SHEET_ID,
            range: `Thoms rooster extravaganza!K77:M77`,
        };

        return new Promise<string>((resolve, reject) => {
            sheets.spreadsheets.values.get(options, (err, res) => {
                const rows = res.data.values
                if (rows.length) {
                    let array = [];
                    rows.map((row, count) => {
                       Day day = new Day()
                    });
                } else {
                    reject('No player data found.');
                }
            });
        }); 
    }
}