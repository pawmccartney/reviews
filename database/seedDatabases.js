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

const generateData = function(forCassandra, table) {
    return new Promise((resolve, reject) => {
        let process = fork('./generateData');
        process.send({forCassandra: forCassandra, table: table});
        process.on('message', (msg) => {
            console.log(`${msg} complete.`);
            process.disconnect();
            resolve(msg);
        })
    });
};

/*--------------------------------------------\
* Generate csv files for:
* @POSTGRES: hotels, members, posts
* @Cassandra: TDB
* then seed entries into each database
* then create index tables in postgres using posts tables
* 
*       
\--------------------------------------------*/

// generateData(false, 'posts')
//     .then((res) => {
//         return generateData(false, 'members');
//     })
//     .then((res) => {
//         return generateData(false, 'hotels');
//     })
//     .then((res) => {
//         return generateData(false, 'hotels');
//     })
//     .then((res) => {
//         return generateData(true, 'hotels');
//     })


const seedData = (database, table) => {
    return new Promise((resolve, reject) => {
        let batch = [];
        tracker.start(10000000, 0);
        let numOfInserts = 0;
        let header = table === 'posts' ?  ['isreview', 'hotelid', 'reviewid', 'memberid', 'title', 'text', 'triptype', 'image1', 'image2', 'image3', 'image4', 'reviewreference', 'date'] :  ['id', 'name', 'location', 'orginization', 'position', 'avatar', 'contributions', 'helpful', 'close'];
        let stream = fs.createReadStream(`../database/${database}${table}.csv`).pipe(CSV({separator: '^', headers: header}));
        stream.on('data', (row) => {
            if (batch.length < 1000) {
                let entry;
                if (table === 'posts') {
                    entry = `(${row.isreview},${row.hotelid},${row.hotelid},${row.memberid},'${row.title}','${row.text}','${row.triptype}','${row.image1}','${row.image2}','${row.image3}','${row.image4}',${row.reviewreference},'${row.date}')`;
                } else {
                    entry = `(${row.id},'${row.name}','${row.location}','${row.orginization}','${row.position}','${row.avatar}',${row.contributions},${row.helpful},'${row.close}')`;
                }
                batch.push(entry);
            } else {
                stream.pause();
                let query = table === ' members' ? `INSERT INTO members(id,name,location,orginization,position,avatar,contributions,helpful,close)VALUES${batch.join(',')};` : `INSERT INTO posts(isreview,hotelid,reviewid,memberid,title,text,triptype,image1,image2,image3,image4,reviewreference,date)VALUES${batch.join(',')};`;
                batch = [];
                pgPool.query(query, (err, res) => {
                    if (err) {
                        reject(err);
                    }
                    if (numOfInserts < 10000000) {
                        tracker.stop();
                        tracker.increment(1000);
                        numOfInserts+= 1000;
                        stream.resume();
                    } else {
                        resolve(numOfInserts);
                    }
                })
            }
        });
    })
}

generateData(false, 'posts')
    .then((msg) => {
        console.log(msg);
        return seedData('postgres', 'posts')
    })
    .then((msg) => {
        console.log(`${msg} insrted for postfress: memebers.`)
    })
    .catch((err) => {
        tracker.stop();
        console.log(err);
    })
