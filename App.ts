import {Startup} from "./Source/Startup" ;
import {config as env} from "dotenv";

class Bot {
    constructor() {
        env();
    }

    public start(botkey :string = process.env.DISCORD_TOKEN, sheetkey :string = null ) {
       const bot = new Startup(botkey, sheetkey);          
    }
}
 new Bot().start();