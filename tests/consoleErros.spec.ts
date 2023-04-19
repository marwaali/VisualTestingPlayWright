import {test} from'@playwright/test'
import urls from'../helperFunctions/urls'
import files from'../helperFunctions/files'



let data :string[] = [];
let csvfilePath:string;
let columnHeader:string;

test.beforeAll(async()=>{
    let columns = {
        url: 'Url',
        error: 'Error',
      };
    columnHeader = columns.url+',' + columns.error;
    
});

test("Browser Console Errors", async({page}, testInfo)=>{
    csvfilePath = files.createCSV(testInfo.title +'-'+testInfo.project.name+'.csv', columnHeader);
    page.on('console', msg => {
        if (msg.type() == 'error'){
            console.log(msg.text());
            data.push(msg.text());
            }
        }
      );

    let linksArray = await urls.getUrls(page);
    for (let i = 0; i < linksArray.length; i++) {
        await page.goto(linksArray[i], {waitUntil:'load'});
        if (data.length !==0) {
            let row = linksArray[i]+','+ data;
            files.appendToCsv(csvfilePath ,row);
        }else{
            files.appendToCsv(csvfilePath ,linksArray[i]+',No Errors');
        }
        data = [];
    }
});