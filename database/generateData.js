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

const makeUrl = (i) => {
    if (i < 10) return  `/image0000${i}.jpg`;
    if (i < 100) return  `/image000${i}.jpg`;
    return `/image00${i}.jpg`;
};

const imageUrls =  (function() {
    let imageUrls = [];
    for (let i = 1; i < 689; i++) {
        imageUrls.push(makeUrl(i));
    }
    return imageUrls;
})();

/*--------------------------------------\
|       Batch entires by 100            |
|   Define inputs and partitions here   |
\--------------------------------------*/

let makeReviewInfo = () => {
    let triptypes = ['Families', 'Couples', 'Solo', 'Business', 'Friends'];
    let data = {
        picure1: imageUrls[Math.floor(Math.random() * imageUrls.length)],
        picture2: imageUrls[Math.floor(Math.random() * imageUrls.length)],
        picture3: imageUrls[Math.floor(Math.random() * imageUrls.length)],
        picture4: imageUrls[Math.floor(Math.random() * imageUrls.length)],
        reviewText:  faker.lorem.sentence(),
        reviewTripType: triptypes[Math.random(Math.floor() * triptypes.length)],
        reviewTitle: faker.lorem.words(),
        reviewRating: Math.floor(Math.random() * 150),
        reviewDate: faker.date.recent(360)
    };
    return JSON.stringify(data);
};

const makeMemberInfo = (start, hotelId) => {
    let data = {
        memberId: `'${Math.floor(Math.random() * start + hotelId)}'`,
        memberImage: imageUrls[Math.floor(Math.random() * imageUrls.length)],
        memberUserNaem: faker.lorem.word(),
        memberLocation: faker.lorem.word(),
        memberContributions: Math.floor(Math.random() * 700),
        memberHelpful: Math.floor(Math.random() * 78)
    };
    return JSON.stringify(data);
}

const makeResponseInfo = (hotelID) => {
    let data = {
        hotelID: `'${hotelID}'`,
        responderOrg: faker.lorem.word(),
        responderPicture: imageUrls[Math.floor(Math.random() * imageUrls.length)],
        responderClose: faker.lorem.words(),
        respnderDate: faker.date.recent(360),
        responderName: faker.lorem.words(),
        responderPosition: faker.lorem.words(),
        responderText: faker.lorem.sentence()
    };
    return JSON.stringify(data);
}
const makeCassandraEntries = (start, boundry) => {
    let row;
    let group = '';
    for (let hotelId = start; hotelId < boundry; hotelId++) {
        let numberOfRevews = Math.floor(Math.random() * 15 + 3);
        for (let reviewId = 0; reviewId < numberOfRevews; reviewId++) {
            let reviewInfo = makeReviewInfo();
            let reviewRatings = Array.from({length: Math.floor(Math.random() * 10)}, () => Math.floor(Math.random() * 10));
            let responseInfo = makeResponseInfo(hotelId);
            let memberInfo = makeMemberInfo(start,hotelId);
            if (hotelId === 10000000 && reviewId === numberOfRevews - 1) {
                row = `${hotelId}^${reviewId}^${reviewInfo}^${memberInfo}^${responseInfo}^[${reviewRatings}]`
            } else {            
                row = `${hotelId}^${reviewId}^${reviewInfo}^${memberInfo}^${responseInfo}^[${reviewRatings}]\n`
            }
            group = group.concat(row);
        }
        tracker.increment();
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
    let triptypes = ['Families', 'Couples', 'Solo', 'Business', 'Friends'];
    for (let start = 0; start < numberOfRevews; start++) {
        let row;
        let images = `${imageUrls[Math.floor(Math.random() * imageUrls.length)]}^${imageUrls[Math.floor(Math.random() * imageUrls.length)]}^${imageUrls[Math.floor(Math.random() * imageUrls.length)]}^${imageUrls[Math.floor(Math.random() * imageUrls.length)]}`; 
        if (hotelId === 10000000 && start === numberOfRevews) {
            row = `${hotelId}^${Math.floor(Math.random() * boundry + boundry)}^${faker.lorem.word()}^${faker.lorem.sentence()}^${triptypes[Math.floor(Math.random() * triptypes.length)]}^${images}^${faker.date.recent(360)}`
        } else {
            row = `${hotelId}^${Math.floor(Math.random() * boundry + boundry)}^${faker.lorem.word()}^${faker.lorem.sentence()}^${triptypes[Math.floor(Math.random() * triptypes.length)]}^${images}^${faker.date.recent(360)}\n`
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
    let stream = await forCassandra ? fs.createWriteStream(`../database/cassandra${table}.csv`) : fs.createWriteStream(`../database/postgres${table}.csv`);
    tracker.start(10000000, 0);
    let hotelId = 1;
    const write = function() {
        let drained = true;
        if  (drained) {
            while (hotelId < 10000000 && drained) {
                let entries = forCassandra ? makeCassandraEntries(hotelId, hotelId + 1000) : makePostgresEntries(table, hotelId, hotelId + 1000);
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
