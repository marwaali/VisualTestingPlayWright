import {expect, test} from'@playwright/test';
import cookies from '../helperFunctions/cookies';
import files from'../helperFunctions/files';
import url from'../helperFunctions/urls';
import webPage from '../helperFunctions/webPage';
import config from'../configurations/configuration.json';


let csvfilePath:string;
let columnHeader:string;
let j=0;
let row:string;
let urls:string[]=[];

test.beforeAll(async()=>{
    let columns = {
        url: 'Url',
        pageTitle: "Title",
        fileName: "name",
        status: "Status"
        };
    columnHeader = columns.url+',' + columns.pageTitle+',' + columns.fileName+',' + columns.status
});


test("GetPageContent", async({page},testInfo)=>{
    urls = await url.getUrls(page);
    csvfilePath = files.createCSV("Get Page Content" +'-'+testInfo.project.name+'.csv', columnHeader);
    for (let index = 0; index < urls.length; index++) {
    await page.goto(urls[index], {waitUntil:'networkidle'});
    await cookies.acceptCookies(page);
    await webPage.removeAElementsWithDynamicHtml(page);
    await webPage.removeAttributesWithDynamicHtml(page);
    let pageContent = await webPage.getWebPageContent(page);
    pageContent = webPage.removeUnwantedText(pageContent,config.BaseURL)
    files.createTextFile(encodeURI(await page.title())+'.txt', pageContent);
    row = urls[index]+','+ await page.title()+','+ encodeURI(await page.title())+'.txt'+',' + 'Html Captured';
    files.appendToCsv(csvfilePath ,row);
    }
});

test("ComparePageContent", async({page}, testInfo)=>{
    urls = await url.getUrls(page);
    csvfilePath = files.createCSV("Compare Page Content" +'-'+testInfo.project.name+'.csv', columnHeader);
    for (let index = 0; index < urls.length; index++){
    await page.goto(urls[index], {waitUntil:'networkidle'});
    await cookies.acceptCookies(page);
    await webPage.removeAElementsWithDynamicHtml(page);
    await webPage.removeAttributesWithDynamicHtml(page);
    let pageContent = await webPage.getWebPageContent(page);
    let expected = files.readTextFile(config.contentFiles+'\\'+encodeURI(await page.title())+'.txt');
    let actual = webPage.removeUnwantedText(pageContent,config.BaseURL);
    expect.soft(expected).toEqual(actual)
    if(testInfo.errors.length>j)
    {
        row = urls[index]+','+ await page.title()+','+ encodeURI(await page.title())+'.txt'+',' + "Failed";
        files.createTextFile(encodeURI(await page.title())+'.txt', actual,false);
        j++;
    }else
    {
        row = urls[index]+','+ await page.title()+','+ encodeURI(await page.title())+'.txt'+',' +  'Passed';
    }
    files.appendToCsv(csvfilePath ,row);
}
});