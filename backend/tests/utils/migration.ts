import { Connection, FieldPacket, QueryResult } from "mysql2/promise";
import seed from "./seed";
import {
  adminRoles,
  admins,
  courses,
  grades,
  receipts,
  roles,
  studentCourseAttendance,
  studentCourses,
  students,
  teachers,
} from "./testData";

const tables = [
  "admin",
  "role",
  "admin_role",
  "student",
  "parent",
  "emergency_contact",
  "course",
  "student_course",
  "student_course_attendance",
  "teacher",
  "payment",
  "grade",
  "asset",
  "payment_reminder",
  "receipt",
  "payment_reminder_receipt",
  "payment_reminder_attendance",
  "entity_image",
  "note",
];

const createAdminTable = `CREATE TABLE IF NOT EXISTS
  admin (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid VARCHAR(255) NOT NULL,
    name VARCHAR(255)  NOT NULL,
    surname VARCHAR(255)  DEFAULT NULL,
    nicknameTh VARCHAR(255) DEFAULT NULL,
    nicknameEng VARCHAR(255) DEFAULT NULL,
    gender VARCHAR(255) DEFAULT NULL,
    dateOfBirth DATE DEFAULT NULL,
    email varchar(255) DEFAULT NULL,
    phone varchar(255) DEFAULT NULL,
    line varchar(255) DEFAULT NULL,
    facebook varchar(255) DEFAULT NULL,
    active TINYINT NOT NULL DEFAULT 1,
    deleted TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  )`;

const createRoleTable = `CREATE TABLE IF NOT EXISTS
  role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    deleted TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  )`;

const createAdminRoleTable = `CREATE TABLE IF NOT EXISTS
  admin_role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    adminId INT NOT NULL,
    roleId INT NOT NULL,
    deleted TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  )`;

const createStudentTable = `CREATE TABLE IF NOT EXISTS 
  student (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    gradeId INT DEFAULT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255) DEFAULT NULL,
    nicknameTh VARCHAR(255) DEFAULT NULL,
    nicknameEng VARCHAR(255) DEFAULT NULL,
    gender VARCHAR(255) DEFAULT NULL,
    dateOfBirth DATE DEFAULT NULL,
    age VARCHAR(255) DEFAULT NULL,
    school VARCHAR(255) DEFAULT NULL,
    programme VARCHAR(255) DEFAULT NULL,
    foodAllergies VARCHAR(255) DEFAULT NULL,
    active TINYINT NOT NULL DEFAULT 1,
    deleted TINYINT NOT NULL DEFAULT 0,
    checked TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  )`;

const createParentTable = `CREATE TABLE IF NOT EXISTS 
  parent (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    studentId int UNIQUE NOT NULL,
    name varchar(255) NOT NULL,
    surname varchar(255) DEFAULT NULL,
    nicknameTh varchar(255) DEFAULT NULL,
    nicknameEng varchar(255) DEFAULT NULL,
    gender varchar(255) DEFAULT NULL,
    dateOfBirth datetime DEFAULT NULL,
    email varchar(255) DEFAULT NULL,
    phone varchar(255) DEFAULT NULL,
    line varchar(255) DEFAULT NULL,
    facebook varchar(255) DEFAULT NULL,
    referredBy varchar(255) DEFAULT NULL,
    deleted TINYINT NOT NULL DEFAULT 0,
    createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`;

const createEmergencyContact = `CREATE TABLE IF NOT EXISTS 
  emergency_contact (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    studentId int UNIQUE NOT NULL,
    name varchar(255) NOT NULL,
    surname varchar(255) DEFAULT NULL,
    nicknameTh varchar(255) DEFAULT NULL,
    nicknameEng varchar(255) DEFAULT NULL,
    gender varchar(255) DEFAULT NULL,
    dateOfBirth datetime DEFAULT NULL,
    email varchar(255) DEFAULT NULL,
    phone varchar(255) DEFAULT NULL,
    line varchar(255) DEFAULT NULL,
    facebook varchar(255) DEFAULT NULL,
    deleted TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  )`;

const createCourseTable = `CREATE TABLE IF NOT EXISTS 
  course (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    teacherId int DEFAULT NULL,
    name varchar(255) NOT NULL,
    description longtext,
    date datetime NOT NULL,
    duration int NOT NULL,
    active TINYINT NOT NULL DEFAULT 1,
    deleted TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  )`;

const createStudentCourseTable = `CREATE TABLE IF NOT EXISTS 
  student_course (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    studentId int NOT NULL,
    courseId int NOT NULL,
    gradeId int NOT NULL,
    active TINYINT NOT NULL DEFAULT 1,
    deleted TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  )`;

const createPaymentTable = `CREATE TABLE IF NOT EXISTS 
  payment (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    studentId int NOT NULL,
    courseId int NOT NULL,
    createdByAdminId int NOT NULL,
    periodsPaid int NOT NULL,
    date datetime NOT NULL,
    locked TINYINT NOT NULL DEFAULT 0,
    lockedByAdminId int DEFAULT NULL,
    deleted TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  ) ENGINE=InnoDB AUTO_INCREMENT=53`;

const createStudentCourseAttendanceTable = `CREATE TABLE IF NOT EXISTS 
  student_course_attendance (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid varchar(255) NOT NULL,
    studentId int NOT NULL,
    courseId int NOT NULL,
    date datetime NOT NULL,
    attended TINYINT DEFAULT 0,
    deleted TINYINT NOT NULL DEFAULT 0,
    paymentId int DEFAULT NULL,
    locked TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  )`;

const createTeacherTable = `CREATE TABLE IF NOT EXISTS 
  teacher (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    surname VARCHAR(255)  DEFAULT NULL,
    nicknameTh VARCHAR(255) DEFAULT NULL,
    nicknameEng VARCHAR(255) DEFAULT NULL,
    gender VARCHAR(255) DEFAULT NULL,
    dateOfBirth DATE DEFAULT NULL,
    email varchar(255) DEFAULT NULL,
    phone varchar(255) DEFAULT NULL,
    line varchar(255) DEFAULT NULL,
    facebook varchar(255) DEFAULT NULL,
    active TINYINT NOT NULL DEFAULT 1,
    deleted TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  )`;

const createGradeTable = `CREATE TABLE IF NOT EXISTS
  grade (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) DEFAULT NULL,
    gradeOrder int NOT NULL,
    deleted TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  )`;

const createAssetTable = `CREATE TABLE IF NOT EXISTS
  asset (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    assetKey VARCHAR(255) NOT NULL,
    assetType VARCHAR(255) NOT NULL,
    fileName VARCHAR(255) NOT NULL,
    fileExt VARCHAR(255) NOT NULL,
    fileType VARCHAR(255) NOT NULL,
    fileSize int NOT NULL,
    lastModified bigint NOT NULL,
    deleted TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  )`;

const createEntityImageTable = `CREATE TABLE IF NOT EXISTS
  entity_image (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    assetId int NOT NULL,
    entityId int NOT NULL,
    entityType VARCHAR(255) NOT NULL,
    deleted TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  )`;

const createPaymentReminderTable = `CREATE TABLE IF NOT EXISTS
  payment_reminder (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    periodsPaid int NOT NULL,
    paymentDate datetime NOT NULL,
    studentName VARCHAR(255) NOT NULL,
    dayTime VARCHAR(255) NOT NULL,
    times int NOT NULL,
    hours int NOT NULL,
    periodsLeft int NOT NULL,
    deleted TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  )`;

const createReceiptTable = `CREATE TABLE IF NOT EXISTS
  receipt (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    paymentDate VARCHAR(255) NOT NULL,
    studentFullName VARCHAR(255) NOT NULL,
    grade VARCHAR(255) NOT NULL,
    courseName VARCHAR(255) NOT NULL,
    dayTime VARCHAR(255) NOT NULL,
    startDate VARCHAR(255) NOT NULL,
    times int DEFAULT NULL,
    hours VARCHAR(255) NULL,
    receivedBy VARCHAR(255) NOT NULL,
    deleted TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  )`;

const createPaymentReminderReceiptTable = `CREATE TABLE IF NOT EXISTS
  payment_reminder_receipt (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    studentId int NOT NULL,
    courseId int NOT NULL,
    paymentId int NOT NULL,
    paymentReminderId int NOT NULL,
    receiptId int NOT NULL,
    deleted TINYINT NOT NULL DEFAULT 0,
    sent TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  )`;

const createPaymentReminderAttendanceTable = `CREATE TABLE IF NOT EXISTS 
  payment_reminder_attendance (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uuid varchar(255) NOT NULL,
    paymentReminderId int NOT NULL,
    studentId int NOT NULL,
    courseId int NOT NULL,
    date datetime NOT NULL,
    attended TINYINT DEFAULT 0,
    deleted TINYINT NOT NULL DEFAULT 0,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE current_timestamp()
  )`;

const createNoteTable = `CREATE TABLE IF NOT EXISTS
  note (
    id INT NOT NULL AUTO_INCREMENT,
    studentId INT NOT NULL,
    adminId INT NOT NULL,
    note VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT FK_StudentNote FOREIGN KEY (studentId) REFERENCES student (id) ON UPDATE CASCADE,
    CONSTRAINT FK_AdminNote FOREIGN KEY (adminId) REFERENCES admin (id) ON UPDATE CASCADE
  )`;

const acceptedEnvironents: Record<"test" | "dev", true> = {
  test: true,
  dev: true,
};

interface TableAction {
  (db: Connection, NODE_ENV: "test" | "dev"): Promise<void>;
}

export const dropTables: TableAction = async (db, NODE_ENV) => {
  try {
    console.info("dropping tables...");

    const notesTableExistsQuery =
      "SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'note'";
    const [[{ count }]] = (await db.query(
      notesTableExistsQuery,
    )) as unknown as [[{ count: number }]];

    if (count > 0) {
      await db.query("SET FOREIGN_KEY_CHECKS = 1");
      await db.query("ALTER TABLE note DROP FOREIGN KEY FK_StudentNote");
      await db.query("ALTER TABLE note DROP FOREIGN KEY FK_AdminNote");
    }

    if (!acceptedEnvironents[NODE_ENV]) {
      throw new Error(
        "attempted to drop tables outside of acceptedEnvironents",
      );
    }
    const actions: Promise<[QueryResult, FieldPacket[]]>[] = [];
    tables.forEach((tbl) => {
      const query = `DROP TABLE IF EXISTS ${tbl}`;
      actions.push(db.query(query));
    });
    await Promise.all(actions);
  } catch (e) {
    console.error(e);
  }
};

export const createTables: TableAction = async (db, NODE_ENV) => {
  try {
    console.info("creating tables...");

    if (!acceptedEnvironents[NODE_ENV]) {
      throw new Error(
        "attempted to create tables outside of an acceptedEnvironents",
      );
    }
    await Promise.allSettled([
      db.query(createAdminTable),
      db.query(createRoleTable),
      db.query(createAdminRoleTable),
      db.query(createStudentTable),
      db.query(createParentTable),
      db.query(createEmergencyContact),
      db.query(createCourseTable),
      db.query(createPaymentTable),
      db.query(createStudentCourseTable),
      db.query(createStudentCourseAttendanceTable),
      db.query(createTeacherTable),
      db.query(createGradeTable),
      db.query(createAssetTable),
      db.query(createPaymentReminderTable),
      db.query(createReceiptTable),
      db.query(createPaymentReminderReceiptTable),
      db.query(createPaymentReminderAttendanceTable),
      db.query(createEntityImageTable),
      db.query(createNoteTable),
    ]);
  } catch (e) {
    console.error(e);
  }
};

export const seedTables: TableAction = async (db, NODE_ENV) => {
  try {
    console.info("seeding tables...");

    if (!acceptedEnvironents[NODE_ENV]) {
      throw new Error(
        "attempted to seed tables outside of acceptedEnvironents",
      );
    }

    await Promise.all([
      await db.query(seed.insert.admin, [admins]),
      await db.query(seed.insert.role, [roles]),
      await db.query(seed.insert.adminRole, [adminRoles]),
      await db.query(seed.insert.grade, [grades]),
      await db.query(seed.insert.receipt, [receipts]),
      // await db.query(seed.insert.note, [testData.notes]),
      // await db.query(seed.insert.parent, [testData.parents]),
      // await db.query(seed.insert.emergencyContact, [testData.emergencyContacts]),
      // await db.query(seed.insert.paymentReminderReceipt, [
      //   testData.paymentReminderReceipt,
      // ]),
      // await db.query(seed.insert.pa, [testData.courses]),
      // await db.query(seed.insert.class, [testData.classes]),
      await db.query(seed.insert.course, [courses]),
      await db.query(seed.insert.teacher, [teachers]),
      await db.query(seed.insert.student, [students]),
      await db.query(seed.insert.studentCourse, [studentCourses]),
      await db.query(seed.insert.studentCourseAttendance, [
        studentCourseAttendance,
      ]),
      // await db.query(seed.insert.teacher, [testData.teachers]),
    ]);
  } catch (e) {
    console.error(e);
  }
};
