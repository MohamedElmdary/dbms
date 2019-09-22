export enum Type {
  STRING = 'string',
  BOOLEAN = 'boolean',
  NUMBER = 'number',
  FUNCTION = 'function',
  ARRAY = 'array'
}

export type Schema<T> = {
  [P in keyof T]: {
    type: Type;
  };
};

export type FullSchema<T> = { id: string } & T;

export class Model<T> {
  public constructor(public schema: Schema<T>) {}
}
