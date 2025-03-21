const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcryptjs")
const readline = require("readline")

const prisma = new PrismaClient()
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function main() {
  try {
    console.log("Création d'un compte administrateur")

    const name = await question("Nom: ")
    const email = await question("Email: ")
    const password = await question("Mot de passe: ")

    if (!name || !email || !password) {
      console.error("❌ Tous les champs sont obligatoires")
      process.exit(1)
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      // Mettre à jour l'utilisateur existant pour lui donner le rôle d'administrateur
      await prisma.user.update({
        where: { email },
        data: { role: "ADMIN" },
      })
      console.log(`✅ L'utilisateur ${email} a été promu administrateur`)
    } else {
      // Créer un nouvel utilisateur avec le rôle d'administrateur
      const hashedPassword = await bcrypt.hash(password, 10)
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "ADMIN",
          emailVerified: new Date(),
        },
      })
      console.log(`✅ Compte administrateur créé pour ${email}`)
    }
  } catch (error) {
    console.error("❌ Erreur lors de la création du compte administrateur:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    rl.close()
  }
}

main()

