export type DatabaseGateway = {
  findOne: (
    columns: string[],
    collection: string,
    query: Record<string, any>,
  ) => Promise<any>;
  // findMany: (collection: string, query: Record<string, any>) => Promise<any[]>;
  // insertOne: (collection: string, data: Record<string, any>) => Promise<any>;
  // updateOne: (
  //   collection: string,
  //   query: Record<string, any>,
  //   data: Record<string, any>,
  // ) => Promise<any>;
  // deleteOne: (collection: string, query: Record<string, any>) => Promise<void>;
};
