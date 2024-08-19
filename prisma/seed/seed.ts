import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const nikollas = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'nikollas ohta',
      email: 'nikollas@email.com',
      password: '123456',
    },
  });

  const bob = await prisma.user.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'bob bobson',
      email: 'bob@email.com',
      password: '123456',
    },
  });

  const uill = await prisma.user.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'uill asta',
      email: 'uill@email.com',
      password: '123456',
    },
  });

  const louis = await prisma.user.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'louis philipp',
      email: 'louis@email.com',
      password: '123456',
    },
  });

  const adriel = await prisma.user.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: 'adriel luke',
      email: 'adriel@email.com',
      password: '123456',
    },
  });

  const subject1 = await prisma.subject.create({
    data: {
      name: 'Mathematics',
      description: 'Basic Math',
      workload: 50,
    },
  });

  const subject2 = await prisma.subject.create({
    data: {
      name: 'Physics',
      description: 'Introduction to Physics',
      workload: 40,
    },
  });

  const classroom1 = await prisma.classroom.create({
    data: {
      labNumber: 101,
      subjectId: subject1.id,
    },
  });

  const classroom2 = await prisma.classroom.create({
    data: {
      labNumber: 102,
      subjectId: subject2.id,
    },
  });

  const teacher1 = await prisma.teacher.create({
    data: {
      cpf: '12345678901',
      name: 'John Doe',
      email: 'john.doe@email.com',
      subjects: {
        connect: [{ id: subject1.id }, { id: subject2.id }],
      },
    },
  });

  const teacher2 = await prisma.teacher.create({
    data: {
      cpf: '09876543210',
      name: 'Jane Smith',
      email: 'jane.smith@email.com',
      subjects: {
        connect: [{ id: subject1.id }],
      },
    },
  });

  const beacon1 = await prisma.beacon.create({
    data: {
      uuid: randomUUID(),
      subjectId: subject1.id,
      classroomId: classroom1.id,
      teacherId: teacher1.id,
    },
  });

  const beacon2 = await prisma.beacon.create({
    data: {
      uuid: randomUUID(),
      subjectId: subject2.id,
      classroomId: classroom2.id,
      teacherId: teacher2.id,
    },
  });

  const course1 = await prisma.course.create({
    data: {
      name: 'Computer Science',
      description: 'CS Course',
      subjects: {
        connect: [{ id: subject1.id }, { id: subject2.id }],
      },
    },
  });

  const student1 = await prisma.student.create({
    data: {
      cpf: '98765432100',
      academicalRegister: '20230001',
      name: 'Alice Johnson',
      email: 'alice.johnson@email.com',
      birthDate: '2000-01-01',
      courses: {
        connect: [{ id: course1.id }],
      },
      subjects: {
        connect: [{ id: subject1.id }, { id: subject2.id }],
      },
    },
  });

  const student2 = await prisma.student.create({
    data: {
      cpf: '87654321009',
      academicalRegister: '20230002',
      name: 'Bob Brown',
      email: 'bob.brown@email.com',
      birthDate: '1999-02-02',
      courses: {
        connect: [{ id: course1.id }],
      },
      subjects: {
        connect: [{ id: subject1.id }],
      },
    },
  });

  console.log({
    nikollas,
    bob,
    uill,
    louis,
    adriel,
    subject1,
    subject2,
    classroom1,
    classroom2,
    teacher1,
    teacher2,
    beacon1,
    beacon2,
    course1,
    student1,
    student2,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
