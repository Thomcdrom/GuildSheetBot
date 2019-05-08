import { GdocAutenticate } from './Autenticate';
import { OAuth2Client } from 'googleapis-common';
import { google } from 'googleapis';

export class UpdateGear extends GdocAutenticate {

    private 

    constructor() {
        super();

        this.authenticate();
    }

    public async run(auth: OAuth2Client, id :string, header :number = 1, sheetPage :string = "Thoms rooster extravaganza") {
       
    }
}