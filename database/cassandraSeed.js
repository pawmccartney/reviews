const client = require('./cassandraIndex');

const clearOldTable = 'DROP TABLE IF EXISTS hotels';
const createHotelsTable = `CREATE TABLE hotels(id INT, hotelName TEXT, reviewTitle TEXT, reviewerName TEXT, reviewImages list<text>, memberInfo map<text, text>, reviewText TEXT, responderUsername TEXT, responderInfo map<text, text>, PRIMARY KEY(id, reviewTitle, reviewerName, responderUsername));`; 

const inputs = {
    hotelNames: [
        "'Test motel'",
        "'Test Hotal'",
        "'motel'",
        "'Hotal'",
        "'Hotalmotel'",
        "'motelHotal'",
        "'Test'",
        "'Totel'"
    ],
    reviewTitles: [
        "'test review'",
        "'test review'",
        "'test review'",
        "'test review'",
        "'test review'",
        "'test review'",
        "'test review'",
        "'test review'"
    ],
    reviewerNames: [
        "'Ahmed'",
        "'Elawad'",
        "'AElawad'",
        "'EAhmed'",
        "'Emed'",
        "'Awad'",
        "'Ewad'",
        "'Amed'"
    ],
    reviewImages: "['none', 'noneX2', 'noneX3', 'noneX$']",
    memberInfo: [
        "{'avatar': 'no link', 'location': 'undefined', 'contributions': 'none', 'helpFul': 'no'}",
        "{'avatar': 'no link', 'location': 'undefined', 'contributions': 'none', 'helpFul': 'no'}",
        "{'avatar': 'no link', 'location': 'undefined', 'contributions': 'none', 'helpFul': 'no'}",
        "{'avatar': 'no link', 'location': 'undefined', 'contributions': 'none', 'helpFul': 'no'}",
        "{'avatar': 'no link', 'location': 'undefined', 'contributions': 'none', 'helpFul': 'no'}",
        "{'avatar': 'no link', 'location': 'undefined', 'contributions': 'none', 'helpFul': 'no'}",
        "{'avatar': 'no link', 'location': 'undefined', 'contributions': 'none', 'helpFul': 'no'}",
        "{'avatar': 'no link', 'location': 'undefined', 'contributions': 'none', 'helpFul': 'no'}"
    ],
    reviewText: [
        "'this is one generic entry'",
        "'this is one generic entry'",
        "'this is one generic entry'",
        "'this is one generic entry'",
        "'this is one generic entry'",
        "'this is one generic entry'",
        "'this is one generic entry'",
        "'this is one generic entry'"
    ],
    responderUsername: [
        "'ahmeds'",
        "'not ahmeds'",
        "'not ahmeds review'",
        "'ahmeds review'",
        "'not review'",
        "'review'",
        "'review ahmeds'",
        "'not'"
    ],
    responderInfo: [
        "{'name': 'no name'}",
        "{'name': 'no name'}",
        "{'name': 'no name'}",
        "{'name': 'no name'}",
        "{'name': 'no name'}",
        "{'name': 'no name'}",
        "{'name': 'no name'}",
        "{'name': 'no name'}"
    ]
};


const createEntries = function(inputs, i = 0, recordNum = 0) {
    const insertRecord = `INSERT INTO hotels(id, hotelName, reviewTitle, reviewerName, reviewImages, memberInfo, reviewText, responderUsername, responderInfo)VALUES(${recordNum}, ${inputs.hotelNames[i]}, ${inputs.reviewTitles[i]}, ${inputs.reviewerNames[i]}, ${inputs.reviewImages}, ${inputs.memberInfo[i]}, ${inputs.reviewText[i]}, ${inputs.responderUsername[i]}, ${inputs.responderInfo[i]});`;
    return client.execute(insertRecord)
        .then(() => {
            if (recordNum < 1000) {
                if (i === 7 ) {
                    i = -1;
                }
                recordNum++;
                return createEntries(inputs, i + 1, recordNum + 1);
            }
        })
        .catch((err) => {
            console.error(err);
        })
};

client.execute(clearOldTable)
    .then((res) => {
        return client.execute(createHotelsTable);
    })
    .then((res) => {
        return createEntries(inputs);
    })
    .then((res) => {
        return client.execute('SELECT * FROM hotels');
    })
    .then((entries) => {
        console.log(entries);
    })
    .catch((err) => {
        console.error(err);
    })
