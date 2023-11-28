import { createConnection } from "mysql"

var connection;

function connectToDatabase() {
    return new Promise((res, rej) => {
            connection = createConnection({
                user: 'root',
                password: 'password',
            });
            connection.connect(err => {
                err ? rej(err) : res()
            });
            console.log("connected to databse");
    })
}

function retry(fn, times) {
    let p = fn()
    Array(times).fill(0).forEach(() => p = p.catch(fn).catch(() => {
        return new Promise((res, rej) => {
            console.log("Retrying database connection");
            setTimeout(rej, 2000)
        })
    }))
    return p
}


function createDB() {
    return new Promise((res, rej) =>
        connection.query(`CREATE DATABASE IF NOT EXISTS widgets`, (err, result, fields) =>
            err ? rej(err) : res(result))
    )
}

function createTable() {
    return new Promise((res, rej) =>
        connection.query(`CREATE TABLE IF NOT EXISTS widgets.STORE (
        id INT AUTO_INCREMENT,
        location VARCHAR(255),
        name VARCHAR(255), 
        hasComplimentaryLobsters BOOLEAN, 
        PRIMARY KEY(id)
        )`, (err, result, fields) =>
            err ? rej(err) : res(result)))
}

function populateStores() {
    return new Promise((res, rej) =>
        connection.query(`INSERT INTO widgets.STORE (location, name, hasComplimentaryLobsters) VALUES 
        ("Oslo", "Storgata SuperStore", 1),
        ("Ski", "Senter Butikken", 0)`,
            (err, result, __) =>
                err ? rej(err) : res(result)))

}


retry(connectToDatabase, 10)
    .then(createDB)
    .then(createTable)
    .then(populateStores)
    .catch(err => {
        console.log(err);
    })

function transformDatabaseObjectToBusinessObject(storeDbo) {
    storeDbo.hasComplimentaryLobsters = !!storeDbo.hasComplimentaryLobsters
    return storeDbo
}

export const getStore = id => {
    return new Promise((res, rej) => {
        connection.query("SELECT * FROM widgets.STORE WHERE id = ?", [id], (err, result, _) => {
            if (err) rej(err)
            else res(transformDatabaseObjectToBusinessObject(result[0]))
        })
    })
}

export const getStores = ids => {
    return new Promise((res, rej) => {
        connection.query("SELECT * FROM widgets.STORE WHERE id in (?)", [ids], (err, result, _) => {

            if (err) rej(err)
            else res(result.map(s => transformDatabaseObjectToBusinessObject(s)))
        })
    })
}