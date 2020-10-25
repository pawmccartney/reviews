const faker = require('faker');
const fs = require("fs");
const ProgressBar = require('cli-progress');
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

/*---------------------------------------\
    generate posts with random data
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

const makePostgresEntries = (table, hotelId, boundry) => {
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

/*----------------------------------------------------------------------------\
        Modular function to generate different sets for different tables
        Add heklper functions above to define new schema/dataset
\----------------------------------------------------------------------------*/
const exportDataForBd = async (table, next) => {
    let stream = await fs.createWriteStream(`./database/postgres${table}.csv`);
    tracker.start(10000000, 0);
    let hotelId = 1;
    const write = function() {
        let drained = true;
        if  (drained) {
            while (hotelId < 10000000 && drained) {
                let entries = makePostgresEntries(table, hotelId, hotelId + 1000);
                drained = stream.write(entries);
                hotelId+= 1000;
            }
        }
        if (hotelId < 10000000) {
            stream.once('drain', write);
        } else {
            tracker.stop();
            next(table);
        };
    }
    write();
}

/*----------------------------------------------------------------------------\
    All data gen is done through a forked process to be non blocking
\----------------------------------------------------------------------------*/
process.on('message', ({table}) => {
    exportDataForBd(table, () => {
        let msg = `Postgres: ${table}`;
        process.send(msg);
    });
})
