import { FileSystem } from './FileSystem';
import { Model, FullSchema, Type } from './Model';

export class Dbms<T> {
  public constructor(public name: string, public model: Model<T>) {
    FileSystem.addModel(name);
  }

  private assertType(property: string, value: any): boolean {
    const type: Type = this.model.schema[property].type;
    if (type === Type.ARRAY) {
      return value instanceof Array;
    }
    return typeof value === type;
  }

  public find(id: string): Promise<FullSchema<T> | null> {
    return new Promise(res => {
      res(FileSystem.findOne(this.name, id));
    });
  }

  public findAll(): Promise<FullSchema<T>[]> {
    return new Promise(res => {
      res(FileSystem.findAll(this.name));
    });
  }

  public create(schema: T): Promise<FullSchema<T>> {
    return new Promise(res => {
      for (const property in schema) {
        if (!this.assertType(property, schema[property])) {
          throw new Error(
            `${property}'s value got type ${typeof schema[
              property
            ]} expected \`${this.model.schema[property].type}\``
          );
        }
      }
      const newData: FullSchema<T> = {
        id: new Date().getTime().toString(),
        ...schema
      };

      FileSystem.addEntity(this.name, newData);

      res(newData);
    });
  }

  public update(id: string, schema: Partial<T>): Promise<FullSchema<T>> {
    return new Promise(res => {
      for (const property in schema) {
        if (!this.assertType(property, schema[property])) {
          throw new Error(
            `${property}'s value got type ${typeof schema[
              property
            ]} expected \`${this.model.schema[property].type}\``
          );
        }
      }
      res(FileSystem.updateOne(this.name, id, schema));
    });
  }

  public delete(id: string) {
    return new Promise(res => {
      res(FileSystem.deleteEntity(this.name, id));
    });
  }
}
