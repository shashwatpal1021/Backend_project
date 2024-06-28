require('dotenv').config()
const { createClient } = require('@supabase/supabase-js');
const { supabaseUrl, supabaseKey } = require('../db/books.db')
const supabase = createClient(supabaseUrl, supabaseKey)
const fs = require('fs');
const path = require('path');
const moment = require("moment");
const today = moment();




async function uploadArrayBufferToSupabase(arrayBuffer, destinationPath) {
    // console.log(arrayBuffer)
    await supabase
        .storage
        .from('FileOfImages')
        .upload(destinationPath, arrayBuffer)
        .then(response => {
            console.log(`File uploaded successfully: ${response.data}`);
        })
        .catch(error => {
            console.error(`Error uploading file: ${error.message}`);
        });
}
const latestlistOfImage = (fpath) => {
    const listOfImage = getImagesFromFolder(fpath)
        .then(imageFiles => {
            return imageFiles;
        })
        .catch(error => {
            console.error('Error reading image files:', error);
        });
    return listOfImage
}
function getImagesFromFolder(folderPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(folderPath, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            const imageFiles = files.filter(file => {
                const extname = path.extname(file).toLowerCase();
                return ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.log', '.txt'].includes(extname);
            });
            resolve(imageFiles);
        });
    });
}

exports.readFileAsArrayBuffer = async () => {
    let imagesPath = "./wallpaper"
    const lastWeekDates = getLastWeekDates();
    try {
        const filePathForImage = await latestlistOfImage(imagesPath);
        let filePath = ''
        for (const fileItem of filePathForImage) {
            filePath = `./wallpaper/${fileItem}`
            if (lastWeekDates.includes(fileItem)) {
                let destinationPath = fileItem;
                try {
                    const fileData = fs.readFileSync(filePath);
                    const arrayBuffer = Buffer.from(fileData).buffer;
                    await uploadArrayBufferToSupabase(arrayBuffer, destinationPath);
                } catch (error) {
                    console.error('Error reading file:', error);
                }
            }
        }
        removeFileFromFolder(imagesPath, lastWeekDates);
        // lastWeekDates = 0

    } catch (error) {
        console.log(error)
    }
    return;
}

function removeFileFromFolder(imagesPath, lastWeekDates) {
    fs.readdir(imagesPath, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            if (lastWeekDates.includes(file)) {
                fs.unlink(path.join(imagesPath, file), (err) => {
                    if (err) throw err;
                    console.log(`${file} was deleted`);
                });
            }
        }
    });
}
function getLastWeekDates() {
    const lastWeekStartDate = today.clone().subtract(1, 'week').startOf('week');
    const lastWeekDates = [];
    for (let i = 0; i < 7; i++) {
        const date = lastWeekStartDate.clone().add(i, 'days');
        lastWeekDates.push(`log__${date.format('YYYY-MM-DD')}.log`);
    }
    return lastWeekDates;
}


// Define the cron expression
// const cronExpression = '8 * * 0-6';

// Schedule the cron job
// cron.schedule(cronExpression, readFileAsArrayBuffer);
