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
let inputs = {
    cassandraInputs: {
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
    },
    postGresInputs: {
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
            let imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)];
            return `{'name': '${faker.lorem.word()}','hotelId': '${i}','responderOrg': '${faker.lorem.words()}','responderPicture': '${imageUrl}','responderDate': '${date}','reponderPosition': '${faker.lorem.words()}','responderText': '${faker.lorem.paragraph()}'}`;
        }
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
const makeReviews = (hotelId) => {
    let numberOfRevews = Math.floor(Math.random() * 20 + 3);
    let rowGroup = '';
    for (let start = 0; start < numberOfRevews; start++) {
        let isReview = Math.random() < 0.7 ? true : false;
        let row = ``;
        if (isReview) {
            if (hotelId === 1000 && start === numberOfRevews) {
                row = `${hotelId}^${isReview}^${faker.lorem.paragraph()}^${new Date()}^${faker.lorem.words()}^${faker.lorem.word()}^${Math.floor(Math.random() * 10)}^${faker.lorem.words()}`
            } else {
                row = `${hotelId}^${isReview}^${faker.lorem.paragraph()}^${new Date()}^${faker.lorem.words()}^${faker.lorem.word()}^${Math.floor(Math.random() * 10)}^${faker.lorem.words()}\n`
            }
        } else {
            if (hotelId === 1000 && start === numberOfRevews) {
                row =`${hotelId}^${isReview}^${faker.lorem.paragraph()}^${new Date()}^^^^${faker.lorem.words()}^`
            } else {
                row =`${hotelId}^${isReview}^${faker.lorem.paragraph()}^${new Date()}^^^^${faker.lorem.words()}^\n`
            }
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
                row = `${imageUrls[Math.floor(Math.random() * imageUrls.length)]}^${faker.lorem.word() + start}^${faker.lorem.words() + start}^${Math.floor(Math.random() * 25 + 2)}^${Math.floor(Math.random() * 8 + 3)}^${faker.lorem.words()}^${faker.lorem.words()}`;
            } else {
                row = `${imageUrls[Math.floor(Math.random() * imageUrls.length)]}^${faker.lorem.word() + start}^${faker.lorem.words() + start}^${Math.floor(Math.random() * 25 + 2)}^${Math.floor(Math.random() * 8 + 3)}^${faker.lorem.words()}^${faker.lorem.words()}\n`;
            }
            group = group.concat(row);
        }
    } else if (table === 'pictures') {

    } else if (table === 'posts') {
        for (let start = hotelId; start < boundry; start++) {
            group = group.concat(makeReviews(start));
        }
    } else {
        for (let start = hotelId; start < boundry; start++) {
            tracker.increment();
            let row;
            if (start === 100000000) {
                row = `${start}^${faker.lorem.words() + start}`;
            } else {
                row = `${start}^${faker.lorem.words() + start}\n`;
            }
            group = group.concat(row);
        }
    }
    return  group;
}


const generateData = (hotelId, inputs, header, boundry, stream, forCassandra, table) => {
    let entries = forCassandra ? makeCassandraEntries(inputs.cassandraInputs, hotelId, boundry) : makePostgresEntries(table, hotelId, boundry);
    return async function() {
        await stream.write(entries, (err) => {
            if (err) return console.error(err);
        });
    }
}

const exportDataForBd = function(forCassandra, table) {
    tracker.start(10000000, 0);
    let stream = forCassandra ? fs.createWriteStream('./database/cassandraData.csv') : fs.createWriteStream(`../database/postgres${table}.csv`);
    for (let hotelId = 1; hotelId <= 10000000; hotelId+= 100000) {
        let makeData = generateData(hotelId, inputs, '', hotelId + 100000, stream, forCassandra, table);
        makeData();
    }
    tracker.stop();
};
exportDataForBd(false, 'members');
