const { generateText, checkAndGenerate } = require('./util');
const puppeteer = require('puppeteer');
const { myBeverage } = require('./util');

// Positive Testing
test('should output name and age',()=>{
    const text=generateText('Max',45);
    expect(text).toBe('Max (45 years old)');
    const text3=generateText('Mary',55);
    expect(text3).toBe('Mary (55 years old)');
});

// Positive Testing with empty and null value
test('should output empty and null values',()=>{
    const text2=generateText(' ',null);
    expect(text2).toBe('  (null years old)');
});

// Integration Test

test.each([['Mary',45,'Mary (45 years old)'],['Suresh',31,'Suresh (31 years old)'],['Hari',60,'Hari (60 years old)']])('should generate valid text output',(name,age,expected)=>{
    const text=checkAndGenerate(name,age);
    expect(text).toBe(expected);
});


// End to End Testing
test.only("should output data (entire workflow)",async ()=>{
    const browser=await puppeteer.launch({
        headless:false,
        slowMo:80,
        args:['--windows-size=1920,1080']
    });

    const page=await browser.newPage();
    await page.goto('file:///Users/sudhil/Desktop/NodejsProject/JavaScriptTesting/index.html');
    await page.click('input#name');
    await page.type('input#name','Hari');
    await page.click('input#age');
    await page.type('input#age','66');
    await page.click('#btnAddUser');
    const finalText=await page.$eval('.user-item',el => el.textContent)
    expect(finalText).toBe('Hari (66 years old)');
},10000);

// For Boolean test
describe.each('should output true for delicous and false for sour',()=>{
    
    test('should output true for delicious',()=>{
        expect(myBeverage.delicious).toBeTruthy();
    });

    test('should ouput false for sour',()=>{
        expect(myBeverage.sour).toBeFalsy();
    });
});

// Testing with parameters

describe.only.each`
  a | b  | expected
${4}|${5}|${9}
${6}|${6}|${12}
${9}|${4}|${13}
`('shoudl output correct result after adding a and b',({a,b,expected})=>{
    test('returns valid output',()=>{
        expect(a+b).toBe(expected);
    });
});