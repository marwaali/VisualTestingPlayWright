import { Page } from '@playwright/test';
import config from'../configurations/configuration.json'

class urls {

    constructor() {
    }

    // get desired urls from config file according to runtype key in config
    static async getUrls(page:Page) {
        let linksArray:string[]=[];

        if (config.RunType.toLowerCase()==='one') {
        linksArray.push(config.BaseURL);
            
        }else if (config.RunType.toLowerCase()==='included') {
            for (let index = 0; index < config.IncludedURLs.length; index++) {
                linksArray.push(config.IncludedURLs[index]);
            }

        }else if(config.RunType.toLowerCase()==='all'){
            linksArray.push(config.BaseURL);
            let extractedUrls = await urls.extractUrlsFromPage(page,linksArray)
            for (let index = 0; index < extractedUrls.length; index++) {
                linksArray.push(extractedUrls[index]);
            }
        }else if(config.RunType.toLowerCase()==='ibr'){
            linksArray.push(config.BaseURL);
            for (let index = 0; index < config.IncludedURLs.length; index++) {
                linksArray.push(config.IncludedURLs[index]);
            }

        }
        linksArray = Array.from(new Set(linksArray));
        return linksArray;
    }

    // extract valid urls from pages
    static async extractUrlsFromPage(page:Page, links: string[]){
        let validLinks:string[]=[];
        for (let i = 0; i < links.length; i++) {
            await page.goto(links[i]);
            let pageUrl = page.url();
            let linksInPage = page.locator('a[href]');
            let linksInPageCount = await linksInPage.count();

            let splitDomain = pageUrl.split('.com');
            let domain = splitDomain[0].concat('.com/');

            for (let index = 0; index < linksInPageCount; index++) {
                let element = linksInPage.nth(index);
                let value = await element.getAttribute("href"); 
                if (value?.startsWith("http") && value.includes(domain)) {
                    validLinks.push(value);
                }else{
                    if (value?.startsWith("/",0)) {
                        value = domain.concat(value.replace('/',''));
                        validLinks.push(value);
                    }if(value?.startsWith("#",0)){
                        continue;
                    }
                }
            }
    
        }
        validLinks = Array.from(new Set(validLinks));
        for (let index = 0; index < validLinks.length; index++) {
            const element = validLinks[index];
            for (let j = 0; j < config.ExcludedURLs.length; j++) {
                const excluded = config.ExcludedURLs[j];
                if (element === excluded) {
                    validLinks.splice(index, 1);
                }
            }
        }
        return validLinks;
    }
}

export default urls