const client = require('./cassandraIndex');
const faker = require('faker');
const clearOldTable = 'DROP TABLE IF EXISTS hotels';

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
const seedByHundred = function(inputs, i = 1) {
    let float = i / 1000000;
    let million = Math.floor(i / 1000000); // 1 for 1 mill, 2 for 2 mill, 3 for 3 mill
    let hundredThou = million - float  < 0 ? 1 : million - float * 10;
    let batch = float - million < 0.5 ? 1 : 2;
    let group = '';
    for (let x =  i; x < 100 + i; x++) {
        const insertionScript = `INSERT INTO hotels(million, hundredthousand, hotelbatch, hotelId, hotelname, reviewTitle, reviewerName, reviewImages, memberInfo, reviewText, responderUsername, responderInfo)VALUES(${million}, ${hundredThou}, ${batch}, ${x}, '${inputs.hotelNames()}',${inputs.reviewTitles(x)},${inputs.reviewerNames(x)}, ${inputs.reviewImages}, ${inputs.memberInfo()}, ${inputs.reviewText()}, ${inputs.responderUsername(x)}, ${inputs.responderInfo()});`;
        group = group.concat(insertionScript);
    }
    const batchQry = 'BEGIN BATCH ' + group + 'APPLY BATCH;';
    console.log(`Seeding: ${i}`);
    client.execute(batchQry)
        .catch((err) => {
            debugger;
        });
        if (i < 200000) {
            setTimeout(() => {
                seedByHundred(inputs, i + 100)
            }, 20)
        }
};

client.execute(clearOldTable)
    .then((res) => {
        return client.execute(createHotelsTable);
    })
    .then((res) => {
        seedByHundred(inputs);
    })
    .then(() => {
        seedByHundred(inputs, 100001);
    })
    .catch((err) => {
        debugger;
    })
