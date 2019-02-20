import { WriteJson } from "./WriteJson";

export class JsonFactory{
    public ceateReadJson(): ReadJson {
       const instance = new ReadJson();

       return instance;
    }
    public createWriteJson(): WriteJson{
         const instance = new WriteJson;

        return instance;
    }

    private checkFiles() {}
}