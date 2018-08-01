import {Startup} from "./Startup" ;
class Bot {
    public static start(botkey :string = null, sheetkey :string = null ) {
       const bot = new Startup(botkey, sheetkey);          
    }
}
Bot.start('NDIwMjczNjUxMDkxMjQzMDEz.DkJX7A.PqvK60uMwfU_lvj-ed3JYmHj7f');