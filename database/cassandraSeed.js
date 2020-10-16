const client = require('./cassandraIndex');
const faker = require('faker');
const clearOldTable = 'DROP TABLE IF EXISTS hotels';
const ProgressBar = require('progress');

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
const createHotelsTable = `CREATE TABLE hotels(million INT, hundredthousand INT, hotelbatch INT, hotelId INT, hotelname text, reviewTitle text, reviewInfo map<text, text>, reviewerName text, reviewImages list<text>, memberInfo map<text, text>, reviewText text, responderUsername text, responderInfo map<text, text>, PRIMARY KEY(million, hundredthousand, hotelbatch, hotelId, reviewTitle, reviewerName, responderUsername));`; 

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
    reviewInfo: function() {
        return `{'date': '${new Date()}', 'text': '${faker.lorem.paragraphs()}', 'tripTypw': '${faker.lorem.word()}'}`
    },
    reviewImages: function(urls) {
        return `[${urls.map((url) => `'${url}'`)}]`
    },
    memberInfo: function(i) {
        return `{'id': '${i}', 'avatar': 'no link', 'location': 'undefined', 'contributions': 'none', 'helpFul': 'no'}`
    },
    reviewText: function() {
        return `'${faker.lorem.paragraphs()}'`;
    },
    responderUsername: function(i) {
        return `'${faker.lorem.word() + i}'`;
    },
    responderInfo: function(x) {
        return `{'hotelId': '${x}', 'responderName': '${faker.lorem.word()}', 'orginization': '${faker.lorem.word()}', 'position': '${faker.lorem.words()}', 'picture': 'none', 'date': '${new Date()}', 'text': '${faker.lorem.paragraph()}'}`;
    }
};

/*--------------------------------------\
|       Batch entires by 100            |
|   Define inputs and partitions here   |
\--------------------------------------*/
const seedByHundred = function(inputs, i = 1) {
    let million = Math.floor(i / 1000000); // 0 indexed millions
    let hundredThouFloat = i / 100000;
    let hundredThou = Math.floor(hundredThouFloat); 
    let batch = hundredThouFloat - hundredThou < 0.5 ? 1 : 2;
    let group = '';
    for (let x =  i; x < 100 + i; x++) {
        const insertionScript = `INSERT INTO hotels(million, hundredthousand, hotelbatch, hotelId, hotelname, reviewTitle, reviewInfo, reviewerName, reviewImages, memberInfo, reviewText, responderUsername, responderInfo)VALUES(${million}, ${hundredThou}, ${batch}, ${x}, '${inputs.hotelNames()}',${inputs.reviewTitles(x)}, ${inputs.reviewInfo()},${inputs.reviewerNames(x)}, ${inputs.reviewImages(['none','none','none','none' ])}, ${inputs.memberInfo(x)}, ${inputs.reviewText()}, ${inputs.responderUsername(x)}, ${inputs.responderInfo(x)});`;
        group = group.concat(insertionScript);
    }
    const batchQry = 'BEGIN BATCH ' + group + 'APPLY BATCH;';
    const bar = new ProgressBar(':bar', { total: i })
        if (i < 300000) {
            setInterval(() => {
                bar.tick();
                seedByHundred(inputs, i + 100);
            }, 30)
        }
        client.execute(batchQry)
        .catch((err) => {
            debugger;
        });
};

// client.execute('SELECT * from hotels where million = 0 and hundredthousand = 1 and hotelbatch = 1 and hotelId = 100801;')
//     .then((res) => {
//         console.log(res);
//         debugger;
//     })
//     .catch(err => {
//         debugger;
//     })
client.execute(clearOldTable)
    .then((res) => {
        return client.execute(createHotelsTable);
    })
    .then((res) => {
        seedByHundred(inputs);
    })
    .catch((err) => {
        debugger;
    })
