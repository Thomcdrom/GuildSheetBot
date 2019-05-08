import { OAuth2Client } from "googleapis-common";
import { Cell } from '../../DTO/Cell';
import { google } from "googleapis";

export class FindInHeader {

    private header :number;
    private sheetPage :string;

    constructor (header :number = 1, sheetPage :string = "Thoms rooster extravaganza") {
        this.header = header;
        this.sheetPage = sheetPage;
    }

    public findNonManditory(auth :OAuth2Client) :Promise<Cell[]> {
        const events = ['event', 'non-manditory', 'siege'];
        return this.findInHeader(auth, events);
    }

    public findManditoryDays(auth :OAuth2Client) :Promise<Cell[]> {
        const daysOfTheWeek = ['monday', 'tuesday','wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        return this.findInHeader(auth, daysOfTheWeek);
    }

    public findGear(auth :OAuth2Client) :Promise<Cell[]> {
        const gearTypes = ['family name', 'character name', 'class', 'level', 'ap', 'aap', 'dp'];
        return this.findInHeader(auth, gearTypes);
    }

    private findInHeader(auth :OAuth2Client, searchArray : string[]) :Promise<Cell[]> {
        const sheets = google.sheets({version: 'v4', auth });
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

        const options = {
            spreadsheetId: process.env.SHEET_ID,
            range: `${this.sheetPage}!A${this.header}:Z${this.header}`,
        };

        return new Promise<Cell[]>((resolve, reject) => {
            sheets.spreadsheets.values.get(options, (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    const rows = res.data.values
                    if (rows.length) {
                        let gearType = [];
                        rows.map((row) => {
                            row.map((fields, count) => {
                                let field = fields.toString().toLowerCase().trim();
                                if (searchArray.includes(field)) {
                                    const cell = new Cell()
                                    cell.setCellName(field);
                                    cell.setRow(alphabet[count]);
    
                                    gearType.push(cell);
                                }
                            })
                        });
                        resolve(gearType)
                    } else {
                        reject('no days found');
                    }
                }
            });
        }); 
    }
}