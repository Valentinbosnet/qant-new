const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Fonction pour nettoyer un fichier spécifique
function cleanFile(filePath) {
  console.log(`Nettoyage du fichier: ${filePath}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Sauvegarde du contenu original
    fs.writeFileSync(`${filePath}.backup`, content, 'utf8');
    
    // Remplacer les caractères problématiques
    const originalContent = content;
    
    // Remplacer les "." par "." quand ils sont utilisés comme opérateur d'accès
    content = content
      // Remplacer les points de suspension par des points simples dans les expressions d'accès aux propriétés
      .replace(/(\w+)\.{3}(\w+)/g, '$1.$2')
      // Remplacer les points multiples par un seul point
      .replace(/\.{2,}/g, '.')
      // Remplacer les caractères problématiques courants
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'")
      .replace(/[–—]/g, '-')
      .replace(/[…]/g, '.')
      .replace(/[•]/g, '*')
      // Remplacer les espaces insécables par des espaces normaux
      .replace(/\u00A0/g, ' ')
      // Remplacer les caractères de contrôle
      .replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, '');
    
    // Vérifier si des changements ont été effectués
    const hasChanged = originalContent !== content;
    
    if (hasChanged) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fichier nettoyé: ${filePath}`);
      return true;
    } else {
      console.log(`ℹ️ Aucun changement nécessaire pour: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erreur lors du nettoyage de ${filePath}:`, error.message);
    return false;
  }
}

// Liste des fichiers problématiques identifiés
const problematicFiles = [
  'components/SocialPage.tsx',
  'components/ui/button.tsx',
  'components/ui/card.tsx',
  'app/admin/run-migration/page.tsx',
  'app/ai-predictions/page.tsx'
];

// Nettoyer les fichiers problématiques
console.log('Nettoyage des fichiers problématiques.');
let successCount = 0;

problematicFiles.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    const success = cleanFile(fullPath);
    if (success) successCount++;
  } else {
    console.warn(`⚠️ Fichier non trouvé: ${fullPath}`);
  }
});

console.log('\n--- Résumé ---');
console.log(`Total: ${problematicFiles.length} fichiers`);
console.log(`Nettoyés avec succès: ${successCount} fichiers`);
console.log(`Non trouvés ou erreurs: ${problematicFiles.length - successCount} fichiers`);

// Fonction pour trouver et nettoyer tous les fichiers TypeScript/React
function cleanAllTsFiles() {
  console.log('\nRecherche de tous les fichiers TypeScript/React.');
  
  const findTsFiles = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('.next')) {
        results = results.concat(findTsFiles(fullPath));
      } else if (stat.isFile() && (file.endsWith('.ts') || file.endsWith('.tsx'))) {
        results.push(fullPath);
      }
    });
    
    return results;
  };
  
  const tsFiles = findTsFiles('.');
  console.log(`Trouvé ${tsFiles.length} fichiers TypeScript/React.`);
  
  let cleanedCount = 0;
  tsFiles.forEach(file => {
    const success = cleanFile(file);
    if (success) cleanedCount++;
  });
  
  console.log(`\nNettoyé ${cleanedCount} fichiers sur ${tsFiles.length}.`);
}

// Demander à l'utilisateur s'il veut nettoyer tous les fichiers
console.log('\nVoulez-vous nettoyer tous les fichiers TypeScript/React du projet? (o/n)');
process.stdout.write('> ');

process.stdin.once('data', (data) => {
  const answer = data.toString().trim().toLowerCase();
  if (answer === 'o' || answer === 'oui' || answer === 'y' || answer === 'yes') {
    cleanAllTsFiles();
  }
  process.exit(0);
});