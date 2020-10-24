const client = require('../database/cassandraIndex');

const hotOneInptOne = `INSERT INTO testHotels(id, reviewTitle, memberId, reviewImages, memberInfo, reviewText, responderUsername, responderInfo)
VALUES
(0, 'this was great', 5, ['none', 'for', 'now'], {'id': '5', 'userName': 'AHmed','avatar': 'none','position': 'none','location': 'none','contributions': 'none','helpful': 'none','org':  'none'}, 'generaic review', 'not AHmed', {'org': 'none', 'pos': 'none', 'img': 'none', 'text': 'well the response worked'});`;
const hotOneInptTwo = `INSERT INTO testHotels(id, reviewTitle, memberId, reviewImages, memberInfo, reviewText,responderUsername, responderInfo)
VALUES
(0, 'this was not great', 6, ['none', 'for', 'now'], {'id': '5', 'userName': 'AHmed','avatar': 'none','position': 'none','location': 'none','contributions': 'none','helpful': 'none','org':  'none'}, 'generaic review', 'is AHmed', {'org': 'none', 'pos': 'none', 'img': 'none', 'text': 'well the response worked'});`;
const hotTwoInptOne =  `INSERT INTO testHotels(id, reviewTitle, memberId, reviewImages, memberInfo, reviewText,responderUsername, responderInfo)
VALUES
(1, 'this was not great', 6, ['none', 'for', 'now'], {'id': '5', 'userName': 'AHmed','avatar': 'none','position': 'none','location': 'none','contributions': 'none','helpful': 'none','org':  'none'}, 'generaic review','not elawad', {'org': 'none', 'pos': 'none', 'img': 'none', 'text': 'well the response worked'});`;
const hotTwoInptTwo =  `INSERT INTO testHotels(id, reviewTitle, memberId, reviewImages, memberInfo, reviewText,responderUsername, responderInfo)
VALUES
(1, 'this was super great', 7, ['none', 'for', 'now'], {'id': '5', 'userName': 'AHmed','avatar': 'none','position': 'none','location': 'none','contributions': 'none','helpful': 'none','org':  'none'}, 'generaic review','is elawad', {'org': 'none', 'pos': 'none', 'img': 'none', 'text': 'well the response worked'});`;
const createHotelsTable = `CREATE TABLE testHotels(id int, reviewTitle TEXT, memberId INT, reviewImages LIST<text>, memberInfo map<text, text>, reviewText TEXT, responderUsername TEXT, responderInfo map<text, text>, PRIMARY KEY(id, reviewTitle, memberId, responderUsername));`; 
beforeAll(() => {
    const drop = `DROP TABLE IF EXISTS testHotels`;
    return client.execute(drop)
    .catch((err) => {
        console.error(err)
    });
})
afterAll(() => {
    const drop = `DROP TABLE IF EXISTS testHotels`;
    return client.execute(drop)
        .catch((err) => console.error(err));
})

describe('creates new table', () => {
    test('Insert table into datacenter1', (done) => {
        return client.execute(createHotelsTable)
            .then((res) => {
                expect(res.info.queriedHost).toBe('127.0.0.1:9042');
                done();
            })
            .catch((err) => {
                done(err);
            })
    });
    test('Inserted table contains inputs', (done) => {
        const getNewTable = 'SELECT * FROM testHotels';
        return client.execute(getNewTable)
            .then((res) => {
                expect(res).toBeDefined();
                expect(res.columns.length).toBe(8);
                done();
            })
            .catch((err) => {
                done(err);
            })
    });
    describe('multiple inserts', () => {
        beforeAll(() => {
            return client.execute(hotOneInptOne)
                .then((response) => client.execute(hotOneInptTwo))
                .then((response) => client.execute(hotTwoInptOne))
                .then((response) => client.execute(hotTwoInptTwo))
                .catch((err) => {
                  console.error(err);
                });
        });
        test('inserts all items', (done) => {
            const getAll = 'SELECT * FROM testHotels';
            return client.execute(getAll)
                .then((result) => {
                    expect(result).toBeDefined();
                    expect(result.rows.length).toBe(4);
                    const hotelReviews = result.rows.reduce((lists, input) => {
                        if (input.id === 0) {
                            lists.hotOne.push(input);
                        } else {
                            lists.hotTwo.push(input);
                        }
                        return lists;
                    }, { hotOne: [], hotTwo: []});
                    expect(hotelReviews.hotOne.length).toBe(2);
                    expect(hotelReviews.hotTwo.length).toBe(2);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        })
    })
});
