// Reference : https://playwright.dev/docs/input#upload-files

const {test, expect}=require('@playwright/test')

test('Single File',async ({page})=>{

    await page.goto('https://www.foundit.in/')

    await page.waitForSelector('.mqfihd-upload');
    await page.locator('.mqfihd-upload').click()

    await page.locator('#file-upload').setInputFiles('tests/uploadFiles/Uploadtext1.txt')
   
    await page.waitForTimeout(5000)
})

test.only('Multiple Files',async ({page})=>{

    await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php')

    await page.locator('#filesToUpload')
                .setInputFiles(['tests/uploadFiles/Uploadtext1.txt',
                                 'tests/uploadFiles/Uploadtext2.txt']);

    await page.waitForTimeout(3000)
    expect (await page.locator('#fileList li:nth-child(1)')).toHaveText('Uploadtext1.txt')
    expect (await page.locator('#fileList li:nth-child(2)')).toHaveText('Uploadtext2.txt')

    await page.waitForTimeout(3000)

    //Removing files
    await page.locator('#filesToUpload').setInputFiles([])
    await page.waitForTimeout(3000)

    expect(await page.locator('#fileList li:nth-child(1)')).toHaveText('No Files Selected')

    await page.waitForTimeout(3000)

})
