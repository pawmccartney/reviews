const faker = require('faker');
const fs = require("fs");
const ProgressBar = require('cli-progress');
const tracker = new ProgressBar.SingleBar({
    format: 'CLI Progress | {percentage}% || {value}/{total} Entries created',
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

const makeUrl = (i) => {
    if (i < 10) return  `https://hr48sdcreviews.s3-us-east-2.amazonaws.com/sdcImages/image0000${i}.jpg`;
    if (i < 100) return  `https://hr48sdcreviews.s3-us-east-2.amazonaws.com/sdcImages/image000${i}.jpg`;
    return `https://hr48sdcreviews.s3-us-east-2.amazonaws.com/sdcImages/image00${i}.jpg`;
};

const imageUrls =  (function() {
    let imageUrls = [];
    for (let i = 1; i < 689; i++) {
        imageUrls.push(makeUrl(i));
    }
    return imageUrls;
})();

const getUrlArrayOfImages = function(imagesNeeded) {
    let urls = [];
    while (urls.length < imagesNeeded) {
        urls.push(`'${imageUrls[Math.floor(Math.random() * 687)]}'`);
    }
    return urls;
}
/*--------------------------------------\
| Generate randomized seed data         |
\--------------------------------------*/
const inputs = {
    hotelNames: function() {
        return faker.lorem.word();
    },
    reviewTitles: function(i) {
        return `${faker.lorem.words() +i}`
    },
    reviewerNames: function(i) {
        return faker.lorem.word() + i;
    },
    memberInfo: function() {
        return "{'avatar': 'no link', 'location': 'undefined', 'contributions': 'none', 'helpFul': 'no'}"
    },
    reviewText: function() {
        return `TH LKMhis is sample text`;
    },
    responderUsername: function(i) {
        return `${faker.lorem.word() + i}`;
    },
    responderInfo: function(i, date) {
        let imageUrl = imageUrls[Math.floor(Math.random() * 688)];
        return `{'name': '${faker.lorem.word()}','hotelId': '${i}','responderOrg': '${faker.lorem.words()}','responderPicture': '${imageUrl}','responderDate': '${date}','reponderPosition': '${faker.lorem.words()}','responderText': '${faker.lorem.paragraph()}'}`;
    }
};

/*--------------------------------------\
|       Batch entires by 100            |
|   Define inputs and partitions here   |
\--------------------------------------*/

const makeCassandraEntries = (group, i, boundry) => {
    let float = i / 1000000;
    let million = Math.floor(float); // 0 indexed
    let hundredThou = million - float  < 0 ? 1 : million - float * 10; // 1 indexed
    let batch = float - million < 0.5 ? 1 : 2; // partition value: 1st hlf of current 100k group -> 1, 2nd half -> 2 ie; 49,000 -> 1, 51,000 -> 2, 112,000 -> 1, 152,000 -> 2
    for (let x =  i; x < boundry; x++) {
        tracker.increment();
        let insertionScript;
        let date = new Date();
        if (x === 1000) {
            insertionScript = `${million}^${hundredThou}^${batch}^${x}^${inputs.hotelNames()}^${inputs.reviewTitles(x)}^${inputs.reviewerNames(x)}^"[${getUrlArrayOfImages(4)}]"^"${inputs.memberInfo()}"^"${inputs.reviewText()}"^${inputs.responderUsername(x)}^"${inputs.responderInfo(x, date)}"`;
        } else {            
            insertionScript = `${million}^${hundredThou}^${batch}^${x}^${inputs.hotelNames()}^${inputs.reviewTitles(x)}^${inputs.reviewerNames(x)}^"[${getUrlArrayOfImages(4)}]"^"${inputs.memberInfo()}"^"${inputs.reviewText()}"^${inputs.responderUsername(x)}^"${inputs.responderInfo(x, date)}"\n`;
        }
        group = group.concat(insertionScript);
    }
    return  group;
}

const makePostgresEntries = (group, i, boundry) => {
    let float = i / 1000000;
    let million = Math.floor(float); // 0 indexed
    let hundredThou = million - float  < 0 ? 1 : million - float * 10; // 1 indexed
    let batch = float - million < 0.5 ? 1 : 2; // partition value: 1st hlf of current 100k group -> 1, 2nd half -> 2 ie; 49,000 -> 1, 51,000 -> 2, 112,000 -> 1, 152,000 -> 2
    for (let x =  i; x < boundry; x++) {
        tracker.increment();
        let insertionScript;
        let date = new Date();
        if (x === 1000) {
            insertionScript = `${million}^${hundredThou}^${batch}^${x}^${inputs.hotelNames()}^${inputs.reviewTitles(x)}^${inputs.reviewerNames(x)}^"[${getUrlArrayOfImages(4)}]"^"${inputs.memberInfo()}"^"${inputs.reviewText()}"^${inputs.responderUsername(x)}^"${inputs.responderInfo(x, date)}"`;
        } else {            
            insertionScript = `${million}^${hundredThou}^${batch}^${x}^${inputs.hotelNames()}^${inputs.reviewTitles(x)}^${inputs.reviewerNames(x)}^"[${getUrlArrayOfImages(4)}]"^"${inputs.memberInfo()}"^"${inputs.reviewText()}"^${inputs.responderUsername(x)}^"${inputs.responderInfo(x, date)}"\n`;
        }
        group = group.concat(insertionScript);
    }
    return  group;
}


const generateData = (i, inputs, header, boundry, stream, forCassandra) => {
    let group = header ? header : '';
    let entries = stream ? makeCassandraEntries(group, i, boundry) : makePostgresEntries(group, i, boundry);
    return async function() {
        await stream.write(entries, (err) => {
            if (err) return console.error(err);
        });
    }
}

const exportDataForBd = function(forCassandra) {
    tracker.start(10000000, 0);
    let stream = forCassandra ? fs.createWriteStream('../database/cassandraData.csv') : fs.createWriteStream('../database/postgresData.csv');
    for (let i = 1; i < 1000; i+= 100) {
        let header = i === 1 ? 'million,hundredthousand,hotelbatch,hotelid,hotelname,reviewtitle,reviewername,reviewimages,memberinfo,reviewtext,responderusername,responderinfo\n' : null;
        let makeData = generateData(i, inputs, '', i + 100, stream, forCassandra);
        makeData();
    }
    tracker.stop();
};

exportDataForBd(true);
