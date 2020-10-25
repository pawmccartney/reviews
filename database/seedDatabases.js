const fs = require('fs');
const pgPool = require('./connections/postgres.index');
const ProgressBar = require('cli-progress');
const CSV = require('csv-parser');
const { fork } = require('child_process');

const tracker = new ProgressBar.SingleBar({
    format: 'CLI Progress | {percentage}% || {value}/{total} Entries created',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
});

const generateData = function(table) {
    return new Promise((resolve, reject) => {
        let process = fork('./database/generateData');
        process.send({table: table});
        process.on('message', (msg) => {
            console.log(`${msg} complete.`);
            process.disconnect();
            resolve(msg);
        });
        process.on('error', (err) => reject(err));
    });
};

/*--------------------------------------------\
* create database in psotgres using .env defined arguments
* Generate csv files for:
* @POSTGRES: hotels, members, posts
* then seed entries into each database
* then create index tables in postgres using posts tables
*       
\--------------------------------------------*/


const seedData = (table) => {
    return new Promise((resolve, reject) => {
        let batch = [], numOfInserts = 0;
        let header = ((table) => {
            if (table === 'posts') return ['hotelid', 'memberid', 'title', 'text', 'triptype', 'image1', 'image2', 'image3', 'image4', 'date'];
            if (table === 'hotels') return ['hotelid', 'name', 'reviewTable'];
            return ['id', 'name', 'location', 'orginization', 'position', 'avatar', 'contributions', 'helpful', 'close'];
        })(table);
        let stream = fs.createReadStream(`../database/postgres_${table}.csv`).pipe(CSV({separator: '^', headers: header}));
        stream.on('data', (row) => {
            if (batch.length < 1000) {
                let entry;
                if (table === 'posts') {
                    entry = `(${row.hotelid},${row.memberid},'${row.title}','${row.text}','${row.triptype}','${row.image1}','${row.image2}','${row.image3}','${row.image4}','${row.date}')`;
                } else if (table === 'hotels') {
                    entry = `(${row.hotelid},'${row.hotelName}',${row.reviewTable})`;
                } else {
                    entry = `(${row.id},'${row.name}','${row.location}','${row.orginization}','${row.position}','${row.avatar}',${row.contributions},${row.helpful},'${row.close}')`;
                }
                batch.push(entry);
            } else {
                stream.pause();
                let query = (function(table, batch) {
                    if (table === 'members') return  `INSERT INTO members(id,name,location,orginization,position,avatar,contributions,helpful,close)VALUES${batch.join(',')};`;
                    if (table === 'posts') return `INSERT INTO posts(hotelid,member,title,text,triptype,image1,image2,image3,image4,date)VALUES${batch.join(',')};`;
                    return `INSERT INTO hotels(hotelid,name,reviewTable)VALUES${batch.join(',')};`;
                })(table, batch);
                batch = [];
                pgPool.query(query, (err, res) => {
                    if (err) {
                        tracker.stop();
                        reject(err);
                    }
                    if (numOfInserts < 10000000) {
                        tracker.increment(1000);
                        numOfInserts+= 1000;
                        stream.resume();
                    } else {
                        tracker.stop();
                        resolve(numOfInserts);
                    }
                })
            }
        });
    })
}


generateData('posts')
    .then((res) => generateData('members'))
    .then((res) => generateData('hotels'))
    .then(() => {
        console.log('Postgres posts seeding complete! Onto Postgress members...')
        return seedData('postgres', 'members')
    })
    .then(() => {
        console.log('Postgres members seeding complete! Onto Postgress hotels...')
        return seedData('postgres', 'hotels')
    })
    .then(() => console.log('Seeding for all data compelete ...'))
    .catch((err) => {
        tracker.stop();
        console.log(err);
    })
