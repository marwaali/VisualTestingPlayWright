import config from'../configurations/configuration.json'
import { Page } from '@playwright/test';

class elements {
    constructor() {
        
    }

    // get Fixed elements in config file and change position to make it fixed
    static async fixedElements(page:Page)
    {
        let fixedElement = config.FixedElements;
        for (let index = 0; index < fixedElement.length; index++) {
            const element = fixedElement[index];
            if (element["allOrcustom"].toLowerCase()==='all') {
                if (element["cssAttribute"].toLowerCase()==='position') {
                    if(await page.locator(element["locator"]).isVisible())
                    {
                        await page.locator(element["locator"]).evaluate(element => element.style.position = element["cssValue"]);
                    }
                }
            }
            if (element["allOrcustom"].toLowerCase()==='custom'&& element["pages"] !== null) {
                let splittedPages = element["pages"].split(',');
                for (let i = 0; i < splittedPages.length; i++)
                {
                    if (splittedPages[i]=== await page.title())
                    {           
                        if(await page.locator(element["locator"]).isVisible())
                        {
                            await page.locator(element["locator"]).evaluate(element => element.style.position = element["cssValue"]);
                        }
                    }
                }
            }
        }
    }

    // get ignored elements form config file and change visibility to be hidden
    static async ignoredElementElements(page:Page)
    {
        let ignoredElement = config.IgnoredElements;
        for (let index = 0; index < ignoredElement.length; index++) {
            const element = ignoredElement[index];
            if(await page.locator(element).isVisible()){
                await page.locator(element).evaluate(element => element.style.display = "none")
            }
        }
    }

    // get elementsToScreenshots list from config files
    static async getElelementsToscreenShot()
    {
        return config.ElementsToScreenshots;
    }
}

export default elements