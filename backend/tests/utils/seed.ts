const seed = {
  insert: {
    admin: `
      INSERT INTO 
        admin (
          uuid, 
          name, 
          surname, 
          email, 
          nicknameTh, 
          nicknameEng
        ) 
      VALUES 
        ?
    `,
    role: `
      INSERT INTO 
        role (
          name, 
          description
        ) 
      VALUES 
        ?`,
    adminRole: `
      INSERT INTO 
        admin_role (
          adminId, 
          roleId
        ) 
      VALUES 
        ?`,
    student: `
      INSERT INTO 
        student (
          name, 
          surname, 
          nicknameTh, 
          nicknameEng, 
          gender, 
          dateOfBirth, 
          checked
          ) 
      VALUES 
        ?`,
    parent: `
      INSERT INTO 
        parent (
          studentId, 
          name, 
          surname, 
          nicknameTh, 
          nicknameEng, 
          gender, 
          dateOfBirth, 
          email, 
          phone, 
          line, 
          facebook
        ) 
      VALUES 
        ?`,
    emergencyContact: `
      INSERT INTO 
        emergency_contact (
          studentId, 
          name, 
          surname, 
          nicknameTh, 
          nicknameEng, 
          gender, 
          dateOfBirth, 
          email, 
          phone, 
          line, 
          facebook
        ) 
      VALUES 
        ?`,
    course: `
      INSERT INTO 
        course (
          teacherId, 
          name, 
          description, 
          date, 
          duration,
          deleted
        ) 
      VALUES 
        ?`,
    studentCourse: `
      INSERT INTO 
        student_course (
          studentId, 
          courseId,
          gradeId, 
          deleted
        ) 
      VALUES 
        ?`,
    studentCourseAttendance: `
      INSERT INTO 
        student_course_attendance (
          uuid, 
          studentId, 
          courseId, 
          date, 
          attended,
          deleted
        ) 
      VALUES 
        ?`,
    teacher: `
      INSERT INTO 
        teacher (
          name, 
          surname, 
          nicknameEng, 
          active
        ) 
      VALUES 
        ?`,
    grade: `
      INSERT INTO 
        grade (
          name, 
          description, 
          gradeOrder
        ) 
      VALUES 
        ?`,
    note: `
      INSERT INTO 
       note (
        studentId, 
        adminId, 
        note
      ) 
    VALUES 
      ?`,
    paymentReminderReceipt: `
      INSERT INTO 
      payment_reminder_receipt (
        studentId, 
        courseId, 
        paymentId, 
        paymentReminderId,
        receiptId
      ) 
    VALUES 
      ?`,
    receipt: `
      INSERT INTO 
      receipt (
        paymentDate,
        studentFullName,
        grade,
        courseName,
        dayTime,
        startDate,
        hours,
        receivedBy
      ) 
    VALUES 
      ?`,
  },
};

export default seed;
