import { v5 } from 'uuid';
import { createISODateTimeString } from './createISODateTimeString';

const namespace = v5.URL;

export const admins = [
  [
    'a856c5bb-e755-47ec-9a46-66d5738e15db',
    'JohnO',
    '(role: superAdmin)',
    'osullivanj.01@gmail.com',
    'JohnO superAdmin Thai',
    'JohnO superAdmin Eng',
  ],
  [
    '7f79ccd2-dd08-42a6-b5af-412f49f7ebc3',
    'Jay',
    'Richardson',
    'jay@eacschool.com',
    'Teacher Jay Thai',
    'Teacher Jay Eng',
  ],
  [
    '53956ff5-a045-4ae7-99a0-2a1adededb64',
    'Earn',
    '(Staff)',
    'moonyawee@gmail.com',
    'Earn Thai',
    'Earn Eng',
  ],
  [
    'e8d36704-c8cf-401b-83fe-1d96d1b12623',
    'JohnO',
    '(role: admin)',
    'jon@jonsully1.dev',
    'Jon Admin Thai',
    'Jon Admin Eng',
  ],
  [
    '00f476d6-fdc1-4b2b-ac7b-13634914854a',
    'JohnO',
    '(role: editor)',
    'exaudiouk@gmail.com',
    'JohnO Editor Thai',
    'JohnO Editor Eng',
  ],
  [
    '3024bd97-f653-4c45-962c-a8696def71a9',
    'Pinsuma',
    'Richardson',
    'pinsuma17@gmail.com',
    'Pin (nickname Thai)',
    'Pin (nickname Eng)',
  ],
  [
    '11fb1ace-d3bd-4825-937b-8d0594858983',
    'Unknown',
    'Unknown',
    'mtanyamani@gmail.com',
    'Unknown (nickname Thai)',
    'Unknown (nickname Eng)',
  ],
];

export const roles = [
  ['superAdmin', 'Access All Areas'],
  ['admin', 'Limited access'],
  ['editor', 'More limited access'],
];

export const adminRoles = [
  [1, 1],
  [2, 1],
  [3, 2],
  [4, 3],
  [5, 3],
  [6, 3],
  [7, 3],
];

export const students = [
  ['Student', 'One', 'S1nicknameTh', 'Bella', 'male', '2001-01-01', 1],
  ['Student', 'Two', 'S2nicknameTh', 'David', 'female', '2002-02-02', 1],
  ['Student', 'Three', 'S3nicknameTh', 'James', 'male', '2003-03-03', 1],
  ['Student', 'Four', 'S4nicknameTh', 'Helena', 'female', '2004-04-04', 1],
  [
    'Student (originally unchecked)',
    'Five',
    'S4nicknameTh',
    'Fabian',
    'male',
    '2005-05-05',
    0,
  ],
  [
    'Student (originally unchecked)',
    'Six',
    'S6nicknameTh',
    'Angelo',
    'male',
    '2006-06-06',
    0,
  ],
];

export const parents = [
  [
    1,
    'Parent',
    'One',
    'P1nicknameTh',
    'P1nicknameEng',
    'male',
    '1990-01-01',
    'P1@email.com',
    '1111111111',
    'P1Line',
    'P1Facebook',
  ],
  [
    2,
    'Parent',
    'Two',
    'P2nicknameTh',
    'P2nicknameEng',
    'female',
    '1991-02-02',
    'P2@email.com',
    '2222222222',
    'P2Line',
    'P2Facebook',
  ],
  [
    3,
    'Parent',
    'Three',
    'P3nicknameTh',
    'P3nicknameEng',
    'male',
    '1992-03-03',
    'P3@email.com',
    '3333333333',
    'P3Line',
    'P3Facebook',
  ],
  [
    4,
    'Parent',
    'Four',
    'P4nicknameTh',
    'P4nicknameEng',
    'female',
    '1993-04-04',
    'P4@email.com',
    '4444444444',
    'P4Line',
    'P4Facebook',
  ],
];

export const emergencyContacts = [
  [
    1,
    'Emergeny Contact',
    'One',
    'EC1nicknameTh',
    'EC1nicknameEng',
    'male',
    '1990-01-01',
    'EC1@email.com',
    '1111111111',
    'EC1Line',
    'EC1Facebook',
  ],
  [
    2,
    'Emergeny Contact',
    'Two',
    'EC2nicknameTh',
    'EC2nicknameEng',
    'female',
    '1991-02-02',
    'EC2@email.com',
    '2222222222',
    'EC2Line',
    'EC2Facebook',
  ],
  [
    3,
    'Emergeny Contact',
    'Three',
    'EC3nicknameTh',
    'EC3nicknameEng',
    'male',
    '1992-03-03',
    'EC3@email.com',
    '3333333333',
    'EC3Line',
    'EC3Facebook',
  ],
  [
    4,
    'Emergeny Contact',
    'Four',
    'EC4nicknameTh',
    'EC4nicknameEng',
    'female',
    '1993-04-04',
    'EC4@email.com',
    '4444444444',
    'EC4Line',
    'EC4Facebook',
  ],
];

export const courses = [
  [
    1,
    'Course 1',
    'This is course 1',
    createISODateTimeString({ days: 1, toMysql: true, hour: 10, min: 30 }),
    60,
    0,
  ],
  [
    2,
    'Course 2',
    'This is course 2',
    createISODateTimeString({ days: 2, toMysql: true, hour: 14, min: 0 }),
    90,
    0,
  ],
  [
    3,
    'Course 3',
    'This is course 3',
    createISODateTimeString({ days: 3, toMysql: true, hour: 11, min: 0 }),
    60,
    0,
  ],
  [
    null,
    'Course 4',
    'This is course 4',
    createISODateTimeString({ days: 4, toMysql: true, hour: 15, min: 0 }),
    90,
    0,
  ],
  [
    null,
    'Course 5',
    'This is course 5',
    createISODateTimeString({ days: 5, toMysql: true, hour: 12, min: 30 }),
    90,
    1,
  ],
  [
    null,
    'Course 6',
    'This is course 6',
    createISODateTimeString({ days: 5, toMysql: true, hour: 12, min: 30 }),
    90,
    0,
  ],
];

// [studentId, courseId, gradeId]
export const studentCourses = [
  // student 1
  [1, 1, 1, 0],
  [1, 2, 2, 0],
  [1, 3, 3, 0],
  // student 2
  [2, 1, 4, 0],
  [2, 3, 5, 0],
  // student 3
  [3, 2, 6, 0],
  // student 4
  [4, 2, 13, 0],
  // student 5
  [5, 5, 13, 1],
  // student 6
  [6, 5, 13, 1],
];

// [id, studentId, courseId, date, attended]
export const studentCourseAttendance = [
  // Student 1, course 1, all classes, attended 3
  [
    v5(`${1}-${1}-${createISODateTimeString({ days: -7 })}`, namespace),
    1,
    1,
    createISODateTimeString({ days: -7, toMysql: true }),
    1,
    0, // deleted
  ],
  [
    v5(`${1}-${1}-${createISODateTimeString({ days: -14 })}`, namespace),
    1,
    1,
    createISODateTimeString({ days: -14, toMysql: true }),
    1,
    0, // deleted
  ],
  [
    v5(`${1}-${1}-${createISODateTimeString({ days: 21 })}`, namespace),
    1,
    1,
    createISODateTimeString({ days: 21, toMysql: true }),
    1,
    0, // deleted
  ],
  // Student 1, course 2, classes 1-4, attended 2
  [
    v5(`${1}-${2}-${createISODateTimeString({ days: -7 })}`, namespace),
    1,
    2,
    createISODateTimeString({ days: -7, toMysql: true }),
    1,
    0, // deleted
  ],
  [
    v5(`${1}-${2}-${createISODateTimeString({ days: -14 })}`, namespace),
    1,
    2,
    createISODateTimeString({ days: -14, toMysql: true }),
    1,
    0, // deleted
  ],
  // Student 1, course 3, classes 12-14, attended 1
  [
    v5(`${1}-${3}-${createISODateTimeString({ days: -7 })}`, namespace),
    1,
    3,
    createISODateTimeString({ days: -7, toMysql: true }),
    1,
    0, // deleted
  ],
  // Student 2, course 1, all classes, attended 2
  [
    v5(`${2}-${1}-${createISODateTimeString({ days: -7 })}`, namespace),
    2,
    1,
    createISODateTimeString({ days: -7, toMysql: true }),
    1,
    0, // deleted
  ],
  [
    v5(`${2}-${1}-${createISODateTimeString({ days: -14 })}`, namespace),
    2,
    1,
    createISODateTimeString({ days: -14, toMysql: true }),
    1,
    0, // deleted
  ],
  // Student 3, course 1, all classes, attended 1
  [
    v5(`${3}-${1}-${createISODateTimeString({ days: -14 })}`, namespace),
    3,
    1,
    createISODateTimeString({ days: -14, toMysql: true }),
    1,
    0, // deleted
  ],
  // Student 3, course 2, classes 1-2, attended 2
  [
    v5(`${3}-${2}-${createISODateTimeString({ days: -7 })}`, namespace),
    3,
    2,
    createISODateTimeString({ days: -7, toMysql: true }),
    1,
    0, // deleted
  ],
  [
    v5(`${3}-${2}-${createISODateTimeString({ days: -14 })}`, namespace),
    3,
    2,
    createISODateTimeString({ days: -14, toMysql: true }),
    1,
    0, // deleted
  ],
  // Student 3, course 3, 9-12, attended 1
  [
    v5(`${3}-${3}-${createISODateTimeString({ days: -14 })}`, namespace),
    3,
    3,
    createISODateTimeString({ days: -14, toMysql: true }),
    1,
    0, // deleted
  ],
  [
    v5(`${3}-${3}-${createISODateTimeString({ days: -14 })}`, namespace),
    5, // Student 5
    5, // course 5
    createISODateTimeString({ days: -14, toMysql: true }), // 2 weeks ago
    1, // attended
    1, // deleted
  ],
  [
    v5(`${3}-${3}-${createISODateTimeString({ days: -14 })}`, namespace),
    5, // Student 5
    5, // course 5
    createISODateTimeString({ days: -7, toMysql: true }), // 1 week ago
    1, // attended
    1, // deleted
  ],
  [
    v5(`${3}-${3}-${createISODateTimeString({ days: -14 })}`, namespace),
    6, // Student 6
    5, // course 5
    createISODateTimeString({ days: -14, toMysql: true }), // 2 weeks ago
    1, // attended
    1, // deleted
  ],
  [
    v5(`${3}-${3}-${createISODateTimeString({ days: -14 })}`, namespace),
    6, // Student 6
    5, // course 5
    createISODateTimeString({ days: -7, toMysql: true }), // 1 week ago
    1, // attende
    1, // deletedd
  ],
];

export const teachers = [
  ['Jay', 'Richardson', 'Teacher Jay', 1],
  ['Steve', 'Baker', 'Teacher Steve', 1],
  ['Jessica', 'Jones', 'Teacher Jess', 1],
  ['David', 'Hasslehoff', 'Teacher Hoff', 0],
];

export const grades = [
  ['K1', 'TBC', 1],
  ['K2', 'TBC', 2],
  ['K3', 'TBC', 3],
  ['P1', 'TBC', 4],
  ['P2', 'TBC', 5],
  ['P3', 'TBC', 6],
  ['P4', 'TBC', 7],
  ['P5', 'TBC', 8],
  ['P6', 'TBC', 9],
  ['M1', 'TBC', 10],
  ['M2', 'TBC', 11],
  ['M3', 'TBC', 12],
  ['adult', 'TBC', 13],
];

export const notes = [
  [1, 1, 'This is note 1'],
  [1, 2, 'This is note 2'],
  [1, 3, 'This is note 3'],
  [1, 1, 'This is note 4'],
  [1, 2, 'This is note 5'],
  [1, 3, 'This is note 6'],
];

export const paymentReminderReceipt = [
  // student 1, course 1, payment 1 with first paymentReminder 1 and receipt history
  [1, 1, 1, 1, 1],
  // as above but a 2nd paymentReminder and receipt history for the same course and payment
  [1, 1, 1, 2, 2],
];

export const receipts = [
  [
    '30/05/23',
    'David Beckham',
    'K1',
    'Jolly Phonics',
    'Tuesdays, 12pm',
    '01/01/23',
    5,
    'johnO',
  ],
];
