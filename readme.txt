"BaseURL": base url

"RunType": run type has 4 values 
one: will use base url only
all: will use base url and all links inside the baseurl webpage and exclude all urls insied excluded urls
included: use all links inside included attribute
ibr: use baseUrl and all links inside included url. 

"ExcludedURLs": list of url that need to be excluded

"IncludedURLs": list of url that need to be included
    
"BaselineFolderPath": base line folder that will contain for all results,

"FixedElements": 
contain for elements that need to be fixed in the page before take screen shot like header
each element on fixed elelement contains for 5 nodes
* locator
* css attribute for element that need to be changed 
* css value 
* all or custom 
--> all -> no need to add values after it. and all means that this change will be applied in all pages
--> custom -> means that this change will be applied in a specific pages
* pages: page titles in where the fixed element will be applied. pages will be sperated with , 

"IgnoredElements": list of all elements that need to be removed from the page before take screen shot

"ElementsToScreenshots": contains for all elements that need to be included in element comparison 
each row contains for element locator and element name and they are sperated with ,
index 0: element locator
index 1: element name

"contentFiles":The path for content file that will be used to get html content for the webpages
"Cookie": cookie site locator,
"elementsWithDynamicAttributes": contains attribute that need to be removed from html before getting html content for the webpage
"elementsWithDynamicLocators": the locators that need to be removed from html before getting html content for the webpage

