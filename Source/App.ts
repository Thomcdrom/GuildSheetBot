import {Startup} from "./Startup" ;
import * as env from "dotenv";

class Bot {
    constructor() {
        env.config();
    }

    public static start(botkey :string = process.env.DISCORD_TOKEN, sheetkey :string = null ) {
       const bot = new Startup(botkey, sheetkey);          
    }
}
Bot.start();