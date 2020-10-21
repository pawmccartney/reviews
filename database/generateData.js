const faker = require('faker');
const fs = require("fs");
const ProgressBar = require('cli-progress');
const { spawn } = require('child_process');
const { writer } = require('repl');
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
let inputs = {
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

const makeCassandraEntries = (cassandraData, i, boundry) => {
    let float = i / 1000000;
    let million = Math.floor(float); // 0 indexed
    let hundredThou = million - float  < 0 ? 1 : million - float * 10; // 1 indexed
    let batch = float - million < 0.5 ? 1 : 2; // partition value: 1st hlf of current 100k group -> 1, 2nd half -> 2 ie; 49,000 -> 1, 51,000 -> 2, 112,000 -> 1, 152,000 -> 2
    let group = '';
    for (let x =  i; x < boundry; x++) {
        tracker.increment();
        let row;
        let date = new Date();
        if (x === 1000) {
            row = `${million}^${hundredThou}^${batch}^${x}^${cassandraData.hotelNames()}^${cassandraData.reviewTitles(x)}^${cassandraData.reviewerNames(x)}^"[${getUrlArrayOfImages(4)}]"^"${cassandraData.memberInfo()}"^"${cassandraData.reviewText()}"^${cassandraData.responderUsername(x)}^"${cassandraData.responderInfo(x, date)}"`;
        } else {            
            row = `${million}^${hundredThou}^${batch}^${x}^${cassandraData.hotelNames()}^${cassandraData.reviewTitles(x)}^${cassandraData.reviewerNames(x)}^"[${getUrlArrayOfImages(4)}]"^"${cassandraData.memberInfo()}"^"${cassandraData.reviewText()}"^${cassandraData.responderUsername(x)}^"${cassandraData.responderInfo(x, date)}"\n`;
        }
        group = group.concat(row);
    }
    return  group;
}


/*---------------------------------------\
|   Makes posts to be sorted by hotel ID |
|     Posts do not have any relation     |
|     Random data is generated use hotel |
|     ID  and force create realtionships |
\---------------------------------------*/
const makeReviews = (hotelId, boundry) => {
    let numberOfRevews = Math.floor(Math.random() * 10 + 1);
    let rowGroup = '';
    let previousReview = 0;
    let reviewReference = null;
    let triptypes = ['Families', 'Couples', 'Solo', 'Business', 'Friends'];
    for (let start = 0; start < numberOfRevews; start++) {
        let isReview = Math.random() < 0.6 ? true : false;
        let reviewId, postText, row, images;
        if (isReview) { 
            images = `${imageUrls[Math.floor(Math.random() * imageUrls.length)]}^${imageUrls[Math.floor(Math.random() * imageUrls.length)]}^${imageUrls[Math.floor(Math.random() * imageUrls.length)]}^${imageUrls[Math.floor(Math.random() * imageUrls.length)]}`
            reviewId = previousReview; 
            previousReview++; 
            reviewReference = null;
        } else {
            images = `${null}^${null}^${null}^${null}`;
            reviewId = null;
            reviewReference = previousReview;
        }
        if (hotelId === 10000000 && start === numberOfRevews) {
            row = `${isReview}^${hotelId}^${reviewId}^${Math.floor(Math.random() * boundry + boundry)}^${faker.lorem.words()}^${faker.lorem.sentence()}^${triptypes[Math.floor(Math.random() * triptypes.length)]}^${images}^${reviewReference}^${faker.date.recent(360)}`
        } else {
            row = `${isReview}^${hotelId}^${reviewId}^${Math.floor(Math.random() * boundry + boundry)}^${faker.lorem.words()}^${faker.lorem.sentence()}^${triptypes[Math.floor(Math.random() * triptypes.length)]}^${images}^${reviewReference}^${faker.date.recent(360)}\n`
        }
        rowGroup = rowGroup.concat(row);
    }
    return rowGroup;
}

const makePostgresEntries = (table, hotelId, boundry, postGresInputs) => {
    let group = '';
    if (table === 'members') {
        for (let start = hotelId; start < boundry; start++) {
            tracker.increment();
            let row;
            if (start === 10000000) {
                row = `${start}^${faker.internet.userName()}^${faker.address.city()}^${faker.company.companyName()}^${faker.name.jobTitle()}^${imageUrls[Math.floor(Math.random() * imageUrls.length)]}^${Math.floor(Math.random() * 100)}^${Math.floor(Math.random() * 30)}^${faker.lorem.words()}`
            } else {
                row = `${start}^${faker.internet.userName()}^${faker.address.city()}^${faker.lorem.word()}^${faker.name.jobTitle()}^${imageUrls[Math.floor(Math.random() * imageUrls.length)]}^${Math.floor(Math.random() * 100)}^${Math.floor(Math.random() * 30)}^${faker.lorem.words()}\n`
            }
            group = group.concat(row);
        }
    } else if (table === 'posts') {
        for (let start = hotelId; start < boundry; start++) {
            tracker.increment();
            group = group.concat(makeReviews(start, boundry));
        }
    } else {
        for (let start = hotelId; start < boundry; start++) {
            tracker.increment();
            let reviewTable = Math.floor(start / 1000000); // 0 indexed tables
            let row;
            if (start === 10000000) {
                row = `${start}^${faker.lorem.words() + start}^${reviewTable}`;
            } else {
                row = `${start}^${faker.lorem.words() + start}^${reviewTable}\n`;
            }
            group = group.concat(row);
        }
    }
    return  group;
}

const exportDataForBd = async (forCassandra, table, next) => {
    let stream = await forCassandra ? fs.createWriteStream('../database/cassandraData.csv') : fs.createWriteStream(`../database/postgres${table}.csv`);
    tracker.start(10000000, 0);
    let hotelId = 1;
    const write = function() {
        let drained = true;
        if  (drained) {
            while (hotelId < 10000000 && drained) {
                let entries = forCassandra ? makeCassandraEntries(inputs, hotelId, hotelId + 100 ) : makePostgresEntries(table, hotelId, hotelId + 1000);
                drained = stream.write(entries);
                hotelId+= 1000;
            }
        }
        if (hotelId < 10000000) {
            stream.once('drain', write);
        } else {
            tracker.stop();
            next(forCassandra, table);
        };
    }
    write();
}

process.on('message', ({forCassandra, table}) => {
    exportDataForBd(forCassandra, table, () => {
        let msg = forCassandra ? `Cassandra: ${table}` : `Postgres: ${table}`;
        process.send(msg);
    });
})
