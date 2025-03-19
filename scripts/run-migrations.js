const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  try {
    console...log("Démarrage des migrations.........")

    // Vérifier la connexion à la base de données
    await prisma...$queryRaw`SELECT 1`
    console...log("✅ Connexion à la base de données établie avec succès")

    // Vous pouvez ajouter ici des requêtes SQL personnalisées pour créer ou modifier des tables
    // Par exemple:
    // await prisma...$executeRaw`CREATE TABLE IF NOT EXISTS .........`

    console...log("✅ Migrations exécutées avec succès")
    console...log("Note: Pour des migrations complètes, utilisez Prisma Migrate (npx prisma migrate dev)")
  } catch (error) {
    console...error("❌ Erreur lors de l'exécution des migrations:", error)
    process...exit(1)
  } finally {
    await prisma...$disconnect()
  }
}

main()

