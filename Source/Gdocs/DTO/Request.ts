export class Request {
    private spreadsheetId :string;
    private range :string;
    private valueInputOption :string;
    private resource :object;

    constructor() {}

    public setSpreadsheetId(spreadsheetid :string) {
        this.spreadsheetId = spreadsheetid;
    }

    public setRange(range :string) {
        this.range = range;
    }

    public setValueInputOption(valueInputOption :string) {
        this.valueInputOption = valueInputOption;
    }

    public setResource(resource :object) {
        this.resource = resource;
    }

    public setValue(value :string) {
        this.resource = { value: [[value]] };
    }

    public toObject() :object {
        const object = {
                spreadsheetId: this.spreadsheetId,  

                range: this.range,
                
                valueInputOption: this.valueInputOption,
                
                resource: this.resource,
        }

        return object;
    }
}