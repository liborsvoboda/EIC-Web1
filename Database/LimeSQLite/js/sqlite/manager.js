// SQLite database manager.

import dumper from "./dumper.js";
import { SQLite } from "./db.js";

// global SQLite WASM API object.
let sqlite3;

// required by the SQLite WASM API.
const CONFIG = {
    print: console.log,
    printErr: console.error,
};

// init loads a database from the specified path
// using the SQLite WASM API.
async function init(gister, name, path) {
    if (sqlite3 === "loading") {
        return Promise.reject(Error("loading"));
    }
    if (sqlite3 === undefined) {
        sqlite3 = "loading";
        sqlite3 = await sqlite3InitModule(CONFIG);
        const version = sqlite3.capi.sqlite3_libversion();
        console.log(`Loaded SQLite ${version}`);
    }
    if (path.type == "local" || path.type == "remote") {
        if (path.value.endsWith(".sql")) {
            return await loadSql(name, path);
        }
        return await loadFile(name, path);
    }
    if (path.type == "binary") {
        return await loadArrayBuffer(name, path);
    }
    if (path.type == "sql") {
        return await loadSqlScript(name, path);
    }
    if (path.type == "id") {
        return await loadGist(gister, path);
    }
    // empty
    return await create(name, path);
}

// create creates an empty database.
async function create(name, path) {
    console.debug("Creating new database...");
    const db = new sqlite3.oo1.DB();
    return new SQLite(name, path, sqlite3.capi, db);
}

// loadArrayBuffer loads a database from the binary database file content.
async function loadArrayBuffer(name, path) {
    console.debug("Loading database from array buffer...");
    const db = loadDbFromArrayBuffer(path.value);
    path.value = null;
    const database = new SQLite(name, path, sqlite3.capi, db);
    database.gatherTables();
    return database;
}

// loadSqlScript loads a database from a plain text SQL script.
async function loadSqlScript(name, path) {
    console.debug(`Loading SQL from script...`);
    const sql = path.value;
    if (!sql) {
        return null;
    }

    const db = new sqlite3.oo1.DB();
    const database = new SQLite(name, path, sqlite3.capi, db);
    database.execute(sql);
    database.gatherTables();
    database.query = "";
    return database;
}

// loadFile loads a database from the specified local or remote binary file.
async function loadFile(name, path) {
    console.debug(`Loading database from url ${path.value}...`);
    const promise = fetch(path.value)
        .then((response) => {
            if (!response.ok) {
                return null;
            }
            return response.arrayBuffer();
        })
        .catch((reason) => {
            return null;
        });
    const buf = await promise;
    if (!buf) {
        return null;
    }

    const db = loadDbFromArrayBuffer(buf);
    const database = new SQLite(name, path, sqlite3.capi, db);
    database.gatherTables();
    return database;
}

// loadSql loads a database from the specified local or remote SQL file.
async function loadSql(name, path) {
    console.debug(`Loading SQL from url ${path.value}...`);
    const promise = fetch(path.value)
        .then((response) => {
            if (!response.ok) {
                return null;
            }
            return response.text();
        })
        .catch((reason) => {
            return null;
        });
    const sql = await promise;
    if (!sql) {
        return null;
    }

    const db = new sqlite3.oo1.DB();
    const database = new SQLite(name, path, sqlite3.capi, db);
    database.execute(sql);
    database.gatherTables();
    database.query = "";
    return database;
}

// loadGist loads a database from the cloud with the specified id.
async function loadGist(gister, path) {
    if (!gister) {
        return Promise.reject("Saving to the cloud is not supported");
    }
    console.debug(`Loading database from gist ${path.value}...`);
    const gist = await gister.get(path.value);
    if (!gist) {
        return null;
    }
    const db = new sqlite3.oo1.DB();
    const database = new SQLite(gist.name, path, sqlite3.capi, db);
    database.id = gist.id;
    database.owner = gist.owner;
    database.execute(gist.schema);
    database.query = gist.query;
    database.calcHashcode();
    database.ensureName();
    return database;
}

// save saves the database to the cloud.
async function save(gister, database, query) {
    if (!gister) {
        return Promise.reject("Saving to the cloud is not supported");
    }
    console.debug(`Saving database to gist...`);
    const schema = dumper.toSql(database, query);
    database.query = query;
    if (!schema && !query) {
        return Promise.resolve(null);
    }
    const oldHashcode = database.hashcode;
    database.gatherTables();
    if (!database.tables.length && !query) {
        return Promise.resolve(null);
    }
    database.calcHashcode();
    database.ensureName();
    let promise;
    if (!database.id || database.owner != gister.username) {
        promise = gister.create(database.name, schema, database.query);
    } else {
        // do not update gist if nothing has changed
        if (database.hashcode == oldHashcode) {
            return Promise.resolve(database);
        }
        promise = gister.update(
            database.id,
            database.name,
            schema,
            database.query
        );
    }
    return promise.then((gist) => afterSave(database, gist));
}

// afterSave updates database attributes after a successful save.
function afterSave(database, gist) {
    if (!gist.id) {
        return null;
    }
    database.id = gist.id;
    database.owner = gist.owner;
    database.path.type = "id";
    database.path.value = `${gist.prefix}:${database.id}`;
    database.ensureName();
    return database;
}

// loadDbFromArrayBuffer loads an SQLite database from the array buffer.
function loadDbFromArrayBuffer(buf) {
    const bytes = new Uint8Array(buf);
    const p = sqlite3.wasm.allocFromTypedArray(bytes);
    const db = new sqlite3.oo1.DB();
    sqlite3.capi.sqlite3_deserialize(
        db.pointer,
        "main",
        p,
        bytes.length,
        bytes.length,
        sqlite3.capi.SQLITE_DESERIALIZE_FREEONCLOSE
    );
    return db;
}

export default { init, save };
