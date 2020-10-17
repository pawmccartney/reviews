const faker = require('faker');
const stream = require("fs").createWriteStream('../database/cassandraData.csv');
const ProgressBar = require('cli-progress');
const tracker = new ProgressBar.SingleBar({
    format: 'CLI Progress | {percentage}% || {value}/{total} Chunks || Speed: {speed}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
});
/*------------------------------------------------------\
| create a new table partitioned as such                |
|    million group -                                    |
|        hundredthosands grouping -                     |
|            batch (split every 100k / 2) -             |
|                hotelid -                              |
|                    reviewTitle(one per hotel) -       |
|                        reviewerName -                 |
|                            responderInfo -            |
 \-----------------------------------------------------*/
const createHotelsTable = `CREATE TABLE hotels(million INT, hundredthousand INT, hotelbatch INT, hotelId INT, hotelname text, reviewTitle text, reviewerName text, reviewImages list<text>, memberInfo map<text, text>, reviewText text, responderUsername text, responderInfo map<text, text>, PRIMARY KEY(million, hundredthousand, hotelbatch, hotelId, reviewTitle, reviewerName, responderUsername));`; 

/*--------------------------------------\
| Generate randomized seed data         |
\--------------------------------------*/
const inputs = {
    hotelNames: function() {
        return faker.lorem.word();
    },
    reviewTitles: function(i) {
        return `'${faker.lorem.words() +i}'`
    },
    reviewerNames: function(i) {
        return `'${faker.lorem.word() + i}'`;
    },
    reviewImages: "['none', 'noneX2', 'noneX3', 'noneX$']",
    memberInfo: function() {
        return "{'avatar': 'no link', 'location': 'undefined', 'contributions': 'none', 'helpFul': 'no'}"
    },
    reviewText: function() {
        return "'this is sample text'";
    },
    responderUsername: function(i) {
        return `'${faker.lorem.word() + i}'`;
    },
    responderInfo: function() {
        return "{'name': 'no name'}";
    }
};

/*--------------------------------------\
|       Batch entires by 100            |
|   Define inputs and partitions here   |
\--------------------------------------*/

const makeEntries = (group, i, boundry) => {
    let float = i / 1000000;
    let million = Math.floor(float); // 0 indexed
    let hundredThou = million - float  < 0 ? 1 : million - float * 10; // 1 indexed
    let batch = float - million < 0.5 ? 1 : 2; // partition value: 1st hlf of current 100k group -> 1, 2nd half -> 2 ie; 49,000 -> 1, 51,000 -> 2, 112,000 -> 1, 152,000 -> 2
    for (let x =  i; x < boundry; x++) {
        tracker.increment();
        let insertionScript;
        if (x === boundry -1) {
            insertionScript = `${million},${hundredThou},${batch},${x},'${inputs.hotelNames()}',${inputs.reviewTitles(x)},${inputs.reviewerNames(x)},${inputs.reviewImages},${inputs.memberInfo()},${inputs.reviewText()},${inputs.responderUsername(x)},${inputs.responderInfo()}`;
        } else {
            insertionScript = `${million},${hundredThou},${batch},${x},'${inputs.hotelNames()}',${inputs.reviewTitles(x)},${inputs.reviewerNames(x)},${inputs.reviewImages},${inputs.memberInfo()},${inputs.reviewText()},${inputs.responderUsername(x)},${inputs.responderInfo()}\n`;
        }
        group = group.concat(insertionScript);
    }
    return  group;
}

const generateData = (i, inputs, header, boundry) => {
    let group = header ? header : '';
    let entries = makeEntries(group, i, boundry);
    return async function() {
        await stream.write(entries, (err) => {
            if (err) return console.error(err);
        });
    }
}
tracker.start(10000000, 0);
for (let i = 1; i < 10000000; i+= 10000) {
    let header = i === 1 ? 'million,hundredthousand,hotelbatch,hotelid,hotelname,reviewtitle,reviewername,reviewimages,memberinfo,reviewtext,responderusername,responderinfo\n' : null;
    let makeData = generateData(i, inputs, header, i + 10000);
    makeData();
}
tracker.stop();

