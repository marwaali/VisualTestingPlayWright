import { Page } from '@playwright/test';
import config from'../configurations/configuration.json'

class webPage{

    constructor(){
       
    }
    
    // get page source for the webpage
    static async getWebPageContent(page:Page)
    {
        return await page.content();
    }

    // remove attributes that contains for dinamic element
    static async removeAttributesWithDynamicHtml(page:Page)
    { 
        await page.evaluate(async () => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForLoadState('networkidle');
        await page.evaluate(async () => window.scrollTo(0, 0));
        let count = config.elementsWithDynamicAttributes.length;
        for (let index = 0; index < count; index++) {
            const locator = config.elementsWithDynamicAttributes[index].locator
            const attributes = config.elementsWithDynamicAttributes[index].attributes;
            const attributesList = attributes.split(',');
            for (let i = 0; i < attributesList.length; i++) {
                const element = await page.$(locator);
                if(element?.isVisible()){
                    let attributeWillBeRemoved = attributesList[i];
                    switch (attributeWillBeRemoved) {
                        case 'data-mobile-navigation-level':
                            await element.evaluate(element=>element.removeAttribute('data-mobile-navigation-level'));
                            break;
                        case 'data-mobile-navigation-open':
                            await element.evaluate(element=>element.removeAttribute('data-mobile-navigation-open'));
                            break;
                        case 'data-navigation-is-compact':
                            await element.evaluate(element=>element.removeAttribute('data-navigation-is-compact'));
                            break;
                        case 'data-bu-bar-ready':
                            await element.evaluate(element=>element.removeAttribute('data-bu-bar-ready'));
                            break;
                        case 'style':
                            await element.evaluate(element=>element.removeAttribute('style'));
                            break;
                        case 'data-search-open':
                            await element.evaluate(element=>element.removeAttribute('data-search-open'));
                            break;
                        case 'href':
                            await element.evaluate(element=>element.removeAttribute('href'));
                            break;
                        case 'data-select2-id':
                            await element.evaluate(element=>element.removeAttribute('data-select2-id'));
                            break;
                        case 'src':
                            await element.evaluate(element=>element.removeAttribute('src'));
                            break;
                        case 'class':
                            await element.evaluate(element=>element.removeAttribute('class'));
                            break;
                        case 'content':
                            await element.evaluate(element=>element.removeAttribute('content'));
                            break;
                        case 'href':
                            await element.evaluate(element=>element.removeAttribute('href'));
                            break;
                        case 'id':
                            await element.evaluate(element=>element.removeAttribute('id'));
                        default:
                            break;
                    }
                }
            }
        }
    }

    // remove elements that contains for dynamic attributes 
    static async removeAElementsWithDynamicHtml(page:Page)
    { 
        await page.evaluate(async () => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForLoadState('networkidle');
        await page.evaluate(async () => window.scrollTo(0, 0));
        let count = config.elementsWithDynamicLocators.length;
        for (let index = 0; index < count; index++) {
            const locator = config.elementsWithDynamicLocators[index].locator
            const elementLocator = await page.$(locator);
            if(elementLocator?.isVisible()){
                await elementLocator.evaluate(element => element.remove());
            }
        }
    }

    // remove unwanted text from the html webpage
    static removeUnwantedText(content:string, url:string){
        let newcontent = content; 
        newcontent = newcontent.replace(/[a-zA-Z]+:[A-Za-z0-9]+ /g , "");
        newcontent = newcontent.replace(/\/pw/g , "");
        newcontent = newcontent.replace(/(?<=hash=).[a-zA-Z0-9]*/g , "");
        newcontent = newcontent.replace(/(?<=rev=).[a-zA-Z0-9]*/g , "");
        newcontent = newcontent.replace(/(?<=w=).[a-zA-Z0-9]*/g , "");
        newcontent = newcontent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi , "");
        newcontent = newcontent.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi , "");
        newcontent = newcontent.replace(/<no script\b[^<]*(?:(?!<\/no script>)<[^<]*)*<\/no script>/gi , "");
        newcontent = newcontent.replace(/w=/g , "");
        newcontent = newcontent.replace(/\?/g , "");
        newcontent = newcontent.replace(/&amp/g , "");
        newcontent = newcontent.replace(/;/g , "");
        newcontent = newcontent.replace(/data-gtm-yt-inspected-6="true"/g , "");
        newcontent = newcontent.replace(/data-gtm-yt-inspected-12="true"/g , "");
        newcontent = newcontent.replace(/data-gtm-yt-inspected-8="true"/g , "");
        newcontent = newcontent.replace(/data-gtm-yt-inspected-9="true"/g , "");
        newcontent = newcontent.replace(/data-gtm-yt-inspected-13="true"/g , "");
        newcontent = newcontent.replace(/data-gtm-yt-inspected-14="true"/g , "");
        newcontent = newcontent.replace(/data-gtm-yt-inspected-43617579_25="true"/g , "");
        newcontent = newcontent.replace(/(?<=t=).[a-zA-Z0-9]*/g , "");
        newcontent = newcontent.replace(/(?<=id=).[a-zA-Z0-9]*/g , "");
        newcontent = newcontent.replace(/(?<=_id=).[-a-z-A-Z-0-9]*/g , "");
        newcontent = newcontent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi , "");
        newcontent = newcontent.replace(/https:\/\/qa-sc101-cdn-prv.rtx.com/g , "");
        newcontent = newcontent.replace(/:\/\/qa-sc101-cdn-prv.rtx.com/g , "");
        newcontent = newcontent.replace(/\/\/qa-sc101-cdn-prv.rtx.com/g , "");
        newcontent = newcontent.replace(/https:\/\/qa-sc101-cdn.rtx.com/g , "");
        newcontent = newcontent.replace(/:\/\/qa-sc101-cdn.rtx.com/g , "");
        newcontent = newcontent.replace(/\/\/qa-sc101-cdn.rtx.com/g , "");
        newcontent = newcontent.replace(/rev=/g , "");
        newcontent = newcontent.replace(/hash=/g , "");
        newcontent = newcontent.replace(/=/g , "");
        newcontent = newcontent.replace(/   /g , " ");
        newcontent = newcontent.replace(/  /g , " ");
        newcontent = newcontent.replace(/    /g , " ");
        newcontent = newcontent.replace(/ >/g , ">");
        newcontent = newcontent.replace(/  >/g , ">");
        newcontent = newcontent.replace(/   >/g , ">");
        newcontent = newcontent.replace(/ /g , "");
        newcontent = newcontent.replace(/^\s*$(?:\r\n?|\n)/gm , "");
        newcontent = newcontent.replace(/pw\//g , "");
        newcontent = newcontent.replace(/\/pw/g , "");
        newcontent = newcontent.replace(/https:\/\/qa101-cd.itworx.com\/en\/pw/g , url);
        newcontent = newcontent.replace(/:\/\/qa101-cd.itworx.com\/en\/pw/g , url);
        newcontent = newcontent.replace(/\/\/qa101-cd.itworx.com\/en\/pw/g , url);
        return newcontent;
    }
}

export default webPage