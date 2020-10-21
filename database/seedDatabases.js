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



const seedData = (database, table) => {
    return new Promise((resolve, reject) => {
        let batch = [];
        let numOfInserts = 0;
        let header = table === 'posts' ?  ['hotelid', 'memberid', 'title', 'text', 'triptype', 'image1', 'image2', 'image3', 'image4', 'date'] :  ['id', 'name', 'location', 'orginization', 'position', 'avatar', 'contributions', 'helpful', 'close'];
        let stream = fs.createReadStream(`./database/${database}${table}.csv`).pipe(CSV({separator: '^', headers: header}));
        stream.on('data', (row) => {
            if (batch.length < 1000) {
                let entry;
                if (table === 'posts') {
                    entry = `(${row.hotelid},${row.memberid},'${row.title}','${row.text}','${row.triptype}','${row.image1}','${row.image2}','${row.image3}','${row.image4}','${row.date}')`;
                } else {
                    entry = `(${row.id},'${row.name}','${row.location}','${row.orginization}','${row.position}','${row.avatar}',${row.contributions},${row.helpful},'${row.close}')`;
                }
                debugger;
                batch.push(entry);
            } else {
                stream.pause();
                let query = table === ' members' ? `INSERT INTO members(id,name,location,orginization,position,avatar,contributions,helpful,close)VALUES${batch.join(',')};` : `INSERT INTO posts(hotelid,member,title,text,triptype,image1,image2,image3,image4,date)VALUES${batch.join(',')};`;
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


generateData(false, 'posts')
    .then((res) => {
        return generateData(false, 'members');
    })
    .then((res) => {
        return generateData(false, 'hotels');
    })
    .then((res) => {
        return generateData(true, 'reviews');
    })
    .then((res) => {
        return seedData('postgres', 'posts');
    })
    .then(() => {
        console.log('Postgres posts seeding complete! Onto Postgress members...')
        return seedData('postgres', 'members')
    })
    .then(() => {
        console.log('Postgres members seeding complete! Onto Postgress hotels...')
        return seedData('postgres', 'hotels')
    })
    .then(() => {
        console.log('Postgres hotels seeding complete! Onto cassandra reviews...')
        return seedData('cassandra', 'reviews')
    })
    .then(() => {
        console.log('Seeding for all data compelete ...');
    })
    .catch((err) => {
        tracker.stop();
        console.log(err);
    })
