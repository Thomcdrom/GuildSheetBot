import {Startup} from "./Startup" ;
class Bot {
    public static start(botkey :string = null, sheetkey :string = null ) {
        try {
            const bot = new Startup(botkey, sheetkey);          
        }
        catch (error) {
            console.log(`something shit the bed: ${error}`)
        }
    }
}

const status = Bot.start('NDIwMjczNjUxMDkxMjQzMDEz.DkJX7A.PqvK60uMwfU_lvj-ed3JYmHj7f8');