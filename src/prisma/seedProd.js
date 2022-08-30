/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.user.create({
    data: {
      email: 'henrique@toud.com.br',
      name: 'Henrique',
      isActive: true,
      isVerified: true,
      password: '$2b$10$GOjP2MEi1LAsZ87m4Imx1OvNNAuexZX2SF0kLV57FbE4x2NPQRfvy', // 12345678
      phoneNumber: '+5541991466936',
      terms: true,
      role: 'ADMIN'
    }
  })
  await prisma.user.create({
    data: {
      email: 'angelo@toud.com.br',
      name: 'Angelo',
      isActive: true,
      isVerified: true,
      password: '$2b$10$GOjP2MEi1LAsZ87m4Imx1OvNNAuexZX2SF0kLV57FbE4x2NPQRfvy', // 12345678
      phoneNumber: '+5541998087129',
      terms: true,
      role: 'ADMIN'
    }
  })

  await prisma.activity.createMany({
    data: activitiesData
  })

  await prisma.placement.createMany({
    data: [{ name: 'Instagram Stories' }]
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

const activitiesData = [
  { name: 'Saúde e Esportes' },
  { name: 'Finanças e Investimentos' },
  { name: 'Negócios e Carreira' },
  { name: 'Espiritualidade' },
  { name: 'Sexualidade' },
  { name: 'Entretenimento' },
  { name: 'Culinária e Gastronomia' },
  { name: 'Idiomas' },
  { name: 'Direito' },
  { name: 'Apps & Software' },
  { name: 'Literatura' },
  { name: 'Casa e Construção' },
  { name: 'Desenvolvimento Pessoal' },
  { name: 'Moda e Beleza' },
  { name: 'Animais e Plantas' },
  { name: 'Educacional' },
  { name: 'Hobbies' },
  { name: 'Internet' },
  { name: 'Ecologia e Meio Ambiente' },
  { name: 'Música e Artes' },
  { name: 'Tecnologia da Informação' },
  { name: 'Empreendedorismo Digital' },
  { name: 'Outros' }
]
