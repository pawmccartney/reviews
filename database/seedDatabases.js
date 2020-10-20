const fs = require('fs');
const { fork } = require('child_process');

const generateData = function(forCassandra, table) {
    return new Promise((resolve, reject) => {
        let process = fork('database/generateData');
        process.send({forCassandra: forCassandra, table: table});
        process.on('message', (msg) => {
            console.log(`Seeding process ${msg}`);
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
generateData(false, 'hotels')
    .then((res) => {
        return generateData(false, 'posts');
    })
    .then((resp) => {
        return generateData(false, 'members');
    })
    .then((res) => {
        return generateData(true);
    })
