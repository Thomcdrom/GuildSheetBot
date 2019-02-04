import {GdocAutenticate} from './Autenticate';
import {google} from 'googleapis';

export class Signup extends GdocAutenticate {

    async Signup(user,value,msg_str){

        const auth = this.authenthication;

        const sheets = google.sheets({version: 'v4', auth });

        sheets.spreadsheets.values.get({
            spreadsheetId: this.sheetId,
            range: 'Thoms rooster extravaganza!B1:B',
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