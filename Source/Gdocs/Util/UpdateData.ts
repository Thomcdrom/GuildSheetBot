import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';
import { Request } from '../DTO/Request';


export class UpdateData {

     public update (auth: OAuth2Client, id :string, count :number, offset :number, day :string, value: string ) :Promise<boolean> {
        const request = new Request()
        const sheets = google.sheets({version: 'v4', auth });

        return new Promise<boolean>((resolve, reject) => {
            request.setSpreadsheetId(id);
            request.setRange(`${process.env.TAB_NAME}!${day}${count+offset}`);
            request.setValueInputOption('USER_ENTERED');
            request.setValue(value);

            sheets.spreadsheets.values.update(request.toObject(), function(err, response) {
                if (err) {
                    console.error(err);
                    reject('A error as occured during the API call, check console for a full error.')
                }
                resolve(true);
            });
        });
     }
}