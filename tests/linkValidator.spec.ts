import {test, request} from'@playwright/test'
import urls from'../helperFunctions/urls'
import files from'../helperFunctions/files'

let data :string;
let csvfilePath:string;
let columnHeader:string;

test.beforeAll(async()=>{
    let columns = {
        url: 'Url',
        status: 'Status',
        statusText: 'Status Text'
      };
    columnHeader = columns.url+',' + columns.status+',' + columns.statusText;
});

test("Broken Links Validation", async({page}, testInfo)=>{
    csvfilePath = files.createCSV(testInfo.title +'-'+testInfo.project.name+'.csv', columnHeader);
    let linksArray= await urls.getUrls(page);

    const context = await request.newContext();
    for (let index = 0; index < linksArray.length; index++) {
        try{
        const response = await context.get(linksArray[index]); 
        data = linksArray[index]+ ','+response.status()+','+response.statusText();
        
        }
        catch{
            data = linksArray[index]+ ',,';
        }
        files.appendToCsv(csvfilePath, data);
    }
});