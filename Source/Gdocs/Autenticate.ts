import { readFile, writeFile } from 'fs';
import {google} from 'googleapis';
import * as readline from 'readline';
import { OAuth2Client } from 'googleapis-common';

let SCOPES = ['https://www.googleapis.com/auth/spreadsheets']; //you can add more scopes according to your permission need. But in case you chang the scope, make sure you deleted the ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json file
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/'; //the directory where we're going to save the token
const TOKEN_PATH = TOKEN_DIR + 'token_AutomationBot.json'; //the file which will contain the token

export abstract class GdocAutenticate {

   private sheetId :string;
   protected authenthication :any;
    
    constructor() {
        this.sheetId = process.env.SHEET_ID;
    }

protected authenticate(){
     readFile('credentials.json', (err, content :Buffer) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.
        this.authorize(JSON.parse(content.toString('utf8')), this.run);
      });
      
  }

 private authorize(credentials, callback) {
    const {client_secret, client_id, redirect_uris} = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
     readFile(TOKEN_PATH, (err, token :any) => {
        if (err) return this.getNewToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token.toString('utf8')));

        callback(oAuth2Client, this.sheetId);
    });

  }

  private getNewToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
      console.log('Authorize this app by visiting this url:', authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
          if (err) return console.error('Error while trying to retrieve access token', err);
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) console.error(err);
            console.log('Token stored to', TOKEN_PATH);
          });
          callback(oAuth2Client, this.sheetId);
        });
      });
  }

   public async run(auth: OAuth2Client, id :string ) {
    console.log('I SHOULD BE OVERWRITTEN!');
  };
}