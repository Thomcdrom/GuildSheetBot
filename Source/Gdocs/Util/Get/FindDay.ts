import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import { Day } from '../../DTO/Day';

export class FindDay {
    
    public findDay(auth: OAuth2Client, header :number = 1, sheetPage :string = "Thoms rooster extravaganza") :Promise<Day[]> {
        const sheets = google.sheets({version: 'v4', auth });

        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
        const daysOfTheWeek = ['monday', 'tuesday','wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const events = ['event', 'non-manditory', 'siege'];

        const options = {
            spreadsheetId: process.env.SHEET_ID,
            range: `${sheetPage}!A${header}:Z${header}`,
        };

        return new Promise<Day[]>((resolve, reject) => {
            sheets.spreadsheets.values.get(options, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    const rows = res.data.values
                    if (rows.length) {
                        let days = [];
                        rows.map((row) => {
                            row.map((fields, count) => {
                                let field = fields.toString().toLowerCase().trim();
                                if (daysOfTheWeek.includes(field) || events.includes(field)) {
                                    const day = new Day()
                                    day.setDay(field);
                                    day.setRow(alphabet[count]);
    
                                    days.push(day);
                                }
                            })
                        });
                        resolve(days)
                    } else {
                        reject('no days found');
                    }
                }
            });
        }); 
    }
}