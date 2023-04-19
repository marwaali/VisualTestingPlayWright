import {test} from'@playwright/test'
import urls from'../helperFunctions/urls'
import files from'../helperFunctions/files'
import screenShot from'../helperFunctions/screenShots'
import elements from '../helperFunctions/elements'



let csvfilePath:string;
let columnsHeader:string;

test.beforeAll(async()=>{
    let columns = {
        url: 'Url',
        hasBaseline: 'Has BaseLine',
        sceenCompared: 'Comparison',
        pageTitle: 'Page title',
        result:'Result'
      };
    columnsHeader = columns.url+',' + columns.hasBaseline + ',' + columns.sceenCompared+ ',' + columns.pageTitle+ ','+columns.result;
});

test("ScreenshotValidationForPages", async({page}, testInfo)=>{
    csvfilePath = files.createCSV(testInfo.title+'-'+testInfo.project.name+'.csv', columnsHeader);
    const linksArray = await urls.getUrls(page);
    await screenShot.compareScreenShot(page,linksArray, csvfilePath, testInfo);
});

test("ScreenshotValidationForElements", async({page}, testInfo)=>{
    csvfilePath = files.createCSV(testInfo.title+'-'+testInfo.project.name+'.csv', columnsHeader);
    const linksArray = await urls.getUrls(page);
    const elementsList = await elements.getElelementsToscreenShot();
    await screenShot.compareScreenShotForElements(page,linksArray, csvfilePath, testInfo, elementsList);
});