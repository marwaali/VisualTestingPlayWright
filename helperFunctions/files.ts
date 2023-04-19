import config from'../configurations/configuration.json'
import file from 'fs'

const month = ["01","02","03","04","05","06","07","08","09","10","11","12"];
const name = new Date().getFullYear()+month[new Date().getMonth()]+ new Date().getDate();
const subFolder = new Date().getHours()+'_'+ new Date().getMinutes();

class files {
    constructor() {
    }

    static getMainFolder()
    {
        return name;
    }

    static getSubFoldername()
    {
        return subFolder;
    }

    // get baseline folder from config file
    static getBaselinefolder(){
        return config.BaselineFolderPath;
    }

    // create test run folder inside baseline folder
    static getCheckPointfolder(){
        let mainfolder = files.getBaselinefolder()+"\\" + files.getMainFolder();
        let checkpointPath = mainfolder+"\\"+ files.getSubFoldername();
            if(!file.existsSync(mainfolder))
            {
                file.mkdirSync(mainfolder);
            }
            if(!file.existsSync(checkpointPath))
            {
                file.mkdirSync(checkpointPath);
            }
       
        return checkpointPath
    }
    
    // create empty csv file with header
    static createCSV(fileName: string, header: string)
    {
        let csvFilePath = files.getCheckPointfolder()+'\\'+fileName;
        file.writeFileSync(csvFilePath,header+"\r\n");
        return csvFilePath;
    }

    // append data to csv file
    static appendToCsv( filePath: string, data:string)
    {
        file.appendFileSync(filePath,data,"utf-8");
        file.appendFileSync(filePath, '\r\n',"utf-8");
        file.closeSync;
    }

    // check if csv file is existing in the given path 
    static checkFileExistance(fileName: string)
    {
        return file.existsSync(fileName);
    }

    // create text file 
    static createTextFile(fileName:string, data:string, isBaseLine = true)
    {
        let contentFile:string;

        if(isBaseLine)
        {
            contentFile = config.contentFiles+'\\'+ fileName;
            if (!file.existsSync(config.contentFiles)) {
                file.mkdirSync(config.contentFiles);
            }
        }else{
            contentFile = files.getCheckPointfolder()+'\\'+fileName;
        }
        file.writeFileSync(contentFile,data);
        return contentFile;
    }

    //read the content of the text file
    static readTextFile(filePath:string){
        return file.readFileSync(filePath,'utf-8');
    }
}

export default files;