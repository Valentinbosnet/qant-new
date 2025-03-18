export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* En-tête */}
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Mon Application Financière</h1>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-grow container mx-auto p-4">
        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Bienvenue sur notre plateforme</h2>
          <p className="text-gray-600 mb-4">
            Notre application est en cours de développement. Nous travaillons dur pour vous offrir
            les meilleures fonctionnalités d'analyse financière et de gestion de portefeuille.
          </p>
          <div className="mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
              En savoir plus
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-3">Analyse de portefeuille</h3>
            <p className="text-gray-600">
              Obtenez des analyses détaillées de votre portefeuille d'investissement.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-3">Prédictions IA</h3>
            <p className="text-gray-600">
              Découvrez les prédictions basées sur l'intelligence artificielle pour vos investissements.
            </p>
          </div>
        </div>
      </main>

      {/* Pied de page */}
      <footer className="bg-gray-800 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Mon Application Financière. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}