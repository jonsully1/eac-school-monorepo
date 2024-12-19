export interface DatabaseClient {
  findOne<T>(collectionOrTable: string, filter: any): Promise<T | null>;
  // insertOne<T>(collectionOrTable: string, data: T): Promise<void>;
  // updateOne<T>(
  //   collectionOrTable: string,
  //   filter: any,
  //   updates: Partial<T>,
  // ): Promise<void>;
  // deleteOne(collectionOrTable: string, filter: any): Promise<void>;
}
