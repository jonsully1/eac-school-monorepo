import { Connection, RowDataPacket } from "mysql2/promise";
import { DatabaseGateway } from "../../core/common/ports/DatabaseGateway";
import { QueryExecutionError } from "../../core/common/errors/QueryExecutionError";

export const createMysqlDatabaseGateway = (
  connection: Connection,
): DatabaseGateway => ({
  async findOne(
    columns: string[],
    collection: string,
    query: Record<string, any>,
  ): Promise<any | null> {
    try {
      const whereClause = `WHERE ${Object.keys(query)
        .map((key) => `\`${key}\` = ?`)
        .join(" AND ")}`;
      const values = Object.values(query);
      const sql = `SELECT ${columns.join(
        ", ",
      )} FROM \`${collection}\` ${whereClause}`;

      const [rows] = await connection.execute<RowDataPacket[]>(sql, values);
      return rows.length > 0 ? rows[0] : null;
    } catch (err) {
      throw QueryExecutionError((err as Error).message);
    }
  },

  // async findMany(
  //   collection: string,
  //   query: Record<string, any>,
  // ): Promise<any[]> {
  //   const [rows] = await connection.execute<RowDataPacket[]>(
  //     `SELECT * FROM ?? WHERE ?`,
  //     [collection, query],
  //   );
  //   return rows;
  // },

  // async insertOne(collection: string, data: Record<string, any>): Promise<any> {
  //   const [result] = await connection.execute<ResultSetHeader>(
  //     `INSERT INTO ?? SET ?`,
  //     [collection, data],
  //   );
  //   return { id: result.insertId, ...data };
  // },

  // async updateOne(
  //   collection: string,
  //   query: Record<string, any>,
  //   data: Record<string, any>,
  // ): Promise<boolean> {
  //   const [result] = await connection.execute<ResultSetHeader>(
  //     `UPDATE ?? SET ? WHERE ?`,
  //     [collection, data, query],
  //   );
  //   return result.affectedRows > 0;
  // },

  // async deleteOne(
  //   collection: string,
  //   query: Record<string, any>,
  // ): Promise<void> {
  //   const [result] = await connection.execute<ResultSetHeader>(
  //     `DELETE FROM ?? WHERE ?`,
  //     [collection, query],
  //   );
  //   if (result.affectedRows === 0) {
  //     throw new Error("No rows deleted");
  //   }
  // },
});
