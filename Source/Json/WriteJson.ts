import * as fs from 'fs';

export class WriteJson {
    //writes new json to the file, also reread the new json
    private writeJSON(file, data) {
        if (data){
            fs.writeFile(file, JSON.stringify(data), 'utf8', function writeFileCallback(err) {
                if (err) console.log(err);
                else module.exports.readJSON(file);
            });
        }
        else {console.error('No Data was provided to write to a file')}
    }
}