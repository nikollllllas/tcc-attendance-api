import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await hash("12345678", 8)

  const nikollas = await prisma.user.upsert({
    where: { id: 1 },

    update: {},

    create: {
      name: "nikollas ohta",

      email: "nikollas@email.com",

      password: hashedPassword,
    },
  })

  const john = await prisma.user.upsert({
    where: { id: 2 },

    update: {},

    create: {
      name: "john doe",

      email: "john@email.com",

      password: hashedPassword,
    },
  })

  const mary = await prisma.user.upsert({
    where: { id: 3 },

    update: {},

    create: {
      name: "mary jane",

      email: "mary@email.com",

      password: hashedPassword,
    },
  })

  const louis = await prisma.user.upsert({
    where: { id: 4 },

    update: {},

    create: {
      name: "louis philipp",

      email: "louis@email.com",

      password: hashedPassword,
    },
  })

  const adriel = await prisma.user.upsert({
    where: { id: 5 },

    update: {},

    create: {
      name: "adriel luke",

      email: "adriel@email.com",

      password: hashedPassword,
    },
  })

  const course = await prisma.course.upsert({
    where: { id: 1 },

    update: {},

    create: {
      name: "Engenharia de Software",
      description: "Curso de Engenharia de Software",
    },
  })

  await prisma.subject.upsert({
    where: { id: 2 },

    update: {},

    create: {
      name: "Sistemas de Informação",
      description: "Curso de Sistemas de Informação",
      workload: 60,
    },
  })

  await prisma.subject.upsert({
    where: { id: 1 },

    update: {},

    create: {
      name: "Matemática",
      description: "Matemática",
      workload: 60,
    },
  })

  await prisma.subject.upsert({
    where: { id: 2 },

    update: {},

    create: {
      name: "Português",
      description: "Português",
      workload: 60,
    },
  })

  await prisma.student.upsert({
    where: { id: 1 },

    update: {},

    create: {
      name: "nikollas ohta",
      email: "nikollas@email.com",
      academicalRegister: "123456",
      birthDate: "1999-01-01",
      cpf: "123456789",
      courseId: course.id,
      subjects: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  })

  await prisma.teacher.upsert({
    where: { id: 1 },

    update: {},

    create: {
      name: "Elyssandro Piffer",
      email: "piffer@prof.unipar.br",
      cpf: "123456789",
      subjects: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  })

  console.log({
    nikollas,
    john,
    mary,
    louis,
    adriel,
    /* 
    subject1,

    subject2,

    classroom1,

    classroom2,

    teacher1,

    teacher2,

    course1,
*/
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })

  .catch(async (e) => {
    console.error(e)

    await prisma.$disconnect()

    process.exit(1)
  })
