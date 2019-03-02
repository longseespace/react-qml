// @see https://facebook.github.io/react-native/docs/asyncstorage

declare const LocalStorage: Qml.QmlLocalStorage;

const DB_NAME = 'ReactQML_AsyncStorage';
const DB_VERSION = '0.1';
const TABLE_NAME = 'data';

let db: Qml.QmlLocalStorage;

try {
  console.time('openDatabaseSync');
  db = LocalStorage.openDatabaseSync(DB_NAME, DB_VERSION, DB_NAME, 1000000);
  console.timeEnd('openDatabaseSync');
} catch (error) {
  throw new Error(`
  Unable to start AsyncStorage engine. Make sure LocalStorage is imported in your index.qml:
    
  \`import QtQuick.LocalStorage 2.0\`
  
  `);
}

try {
  db.transaction(tx =>
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (key TEXT NOT NULL UNIQUE, value TEXT)`
    )
  );
} catch (err) {
  throw new Error(`Unable to start AsyncStorage engine. Error details: ${err}`);
}

export type ResultCallback<T> = (error?: Error, result?: T) => void;
export type ErrorCallback = (error?: Error) => void;
export type MultiErrorCallback = (error?: Array<Error>) => void;
export type RowResult = { key: string; value?: string };

class AsyncStorage {
  static getItem(
    key: string,
    callback?: ResultCallback<string>
  ): Promise<string> {
    console.log('getItem', key);

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        try {
          const rs = tx.executeSql(
            `SELECT * from ${TABLE_NAME} WHERE key = '${key}'`
          );
          const result = rs.rows.length > 0 ? rs.rows[0].value : '';
          callback && callback(undefined, result);
          resolve(result);
        } catch (error) {
          callback && callback(error);
          reject(error);
        }
      });
    });
  }
  static setItem(
    key: string,
    value: string,
    callback?: ErrorCallback
  ): Promise<void> {
    console.log('setItem', key);

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        try {
          tx.executeSql(
            `INSERT OR REPLACE INTO ${TABLE_NAME} (key, value) VALUES (?, ?)`,
            [key, value]
          );
          callback && callback();
          resolve();
        } catch (error) {
          callback && callback(error);
          reject(error);
        }
      });
    });
  }
  static removeItem(key: string, callback?: ErrorCallback): Promise<void> {
    console.log('removeItem', key);

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        try {
          tx.executeSql(`DELETE FROM ${TABLE_NAME} WHERE key = '${key}'`);
          callback && callback();
          resolve();
        } catch (error) {
          callback && callback(error);
          reject(error);
        }
      });
    });
  }
  static mergeItem(
    key: string,
    value: string,
    callback?: ErrorCallback
  ): Promise<void> {
    return Promise.reject(new Error('Not implemented'));
  }
  static clear(callback?: ErrorCallback): Promise<void> {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        try {
          tx.executeSql(`DELETE FROM ${TABLE_NAME}`);
          callback && callback();
          resolve();
        } catch (error) {
          callback && callback(error);
          reject(error);
        }
      });
    });
  }
  static getAllKeys(
    callback?: ResultCallback<Array<string>>
  ): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        try {
          const rs = tx.executeSql(`SELECT key FROM ${TABLE_NAME}`);

          // cannot use map() here, sad
          let results = [];
          for (let index = 0; index < rs.rows.length; index++) {
            const row = rs.rows[index] as RowResult;
            results.push(row.key);
          }

          callback && callback(undefined, results);
          resolve(results);
        } catch (error) {
          callback && callback(error);
          reject(error);
        }
      });
    });
  }
  static multiGet(
    keys: Array<string>,
    callback?: ResultCallback<Array<Array<string>>>
  ): Promise<Array<Array<string>>> {
    return Promise.reject([new Error('Not implemented')]);
  }
  static multiSet(
    keyValuePairs: Array<Array<string>>,
    callback?: MultiErrorCallback
  ): Promise<void> {
    return Promise.reject([new Error('Not implemented')]);
  }
  static multiRemove(
    keys: Array<string>,
    callback?: MultiErrorCallback
  ): Promise<void> {
    return Promise.reject([new Error('Not implemented')]);
  }
  static multiMerge(
    keyValuePairs: Array<Array<string>>,
    callback?: MultiErrorCallback
  ): Promise<void> {
    return Promise.reject([new Error('Not implemented')]);
  }
}

export default AsyncStorage;
