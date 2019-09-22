import { join } from 'path';
import { exists, writeFileSync, appendFileSync, readFileSync } from 'fs';

const DB_PATH = join(__dirname, 'db', 'db.json');

export class FileSystem {
  public static addModel(name: string): void {
    exists(DB_PATH, e => {
      if (!e) {
        appendFileSync(DB_PATH, JSON.stringify({ [name]: [] }));
      } else {
        const data = JSON.parse(readFileSync(DB_PATH).toString());
        if (data[name]) {
          return;
        }
        data[name] = [];
        writeFileSync(DB_PATH, JSON.stringify(data), {
          encoding: 'utf-8',
          flag: 'w'
        });
      }
    });
  }

  public static addEntity(name: string, newData: any): void {
    const data = JSON.parse(readFileSync(DB_PATH).toString());
    data[name] = [...data[name], newData];
    writeFileSync(DB_PATH, JSON.stringify(data), {
      encoding: 'utf-8',
      flag: 'w'
    });
  }

  public static deleteEntity(name: string, id: string): void {
    const data = JSON.parse(readFileSync(DB_PATH).toString());
    const index = data[name].findIndex(d => d.id === id);
    if (index === -1) {
      return null;
    }
    const d = data[name][index];
    data[name].splice(index, 1);
    writeFileSync(DB_PATH, JSON.stringify(data), {
      encoding: 'utf-8',
      flag: 'w'
    });
    return d;
  }

  public static findAll(name: string): [] {
    const data = JSON.parse(readFileSync(DB_PATH).toString());
    return data[name];
  }

  public static findOne(name: string, id: string) {
    const data = JSON.parse(readFileSync(DB_PATH).toString());
    const index = data[name].findIndex(d => d.id === id);
    if (index === -1) {
      return null;
    }
    return data[name][index];
  }

  public static updateOne(name: string, id: string, newData: any) {
    const data = JSON.parse(readFileSync(DB_PATH).toString());
    const index = data[name].findIndex(d => d.id === id);
    if (index === -1) {
      return null;
    }
    data[name][index] = {
      ...data[name][index],
      ...newData
    };
    writeFileSync(DB_PATH, JSON.stringify(data), {
      encoding: 'utf-8',
      flag: 'w'
    });
    return data[name][index];
  }
}
