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
    
    // Remplacer les caractères problématiques courants
    const originalLength = content.length;
    
    content = content
      .replace(/[""]/g, '"')
      .replace(/['']/g, "'")
      .replace(/[--]/g, '-')
      .replace(/[...]/g, '...')
      .replace(/[*]/g, '*')
      // Remplacer les espaces insécables par des espaces normaux
      .replace(/\u00A0/g, ' ')
      // Remplacer les caractères de contrôle
      .replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, '')
      // Remplacer les BOM et autres marqueurs Unicode
      .replace(/^\uFEFF/, '');
    
    // Vérifier si des changements ont été effectués
    const newLength = content.length;
    const changesMade = originalLength !== newLength;
    
    fs.writeFileSync(filePath, content, 'utf8');
    
    if (changesMade) {
      console.log(`✅ Fichier nettoyé: ${filePath} (${originalLength - newLength} caractères remplacés)`);
    } else {
      console.log(`ℹ️ Aucun caractère problématique trouvé dans: ${filePath}`);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Erreur lors du nettoyage de ${filePath}:`, error.message);
    return false;
  }
}

// Fonction pour trouver tous les fichiers JS/TS dans un répertoire
function findJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.git')) {
      findJsFiles(filePath, fileList);
    } else if (
      stat.isFile() && 
      (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx'))
    ) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Point d'entrée principal
function main() {
  const args = process.argv.slice(2);
  
  // Si un fichier spécifique est fourni
  if (args.length > 0 && fs.existsSync(args[0])) {
    cleanFile(args[0]);
    return;
  }
  
  // Sinon, nettoyer tous les fichiers JS/TS du projet
  console.log('Recherche de fichiers JS/TS à nettoyer...');
  const jsFiles = findJsFiles('.');
  console.log(`${jsFiles.length} fichiers trouvés.`);
  
  let successCount = 0;
  let failCount = 0;
  
  jsFiles.forEach(file => {
    const success = cleanFile(file);
    if (success) successCount++;
    else failCount++;
  });
  
  console.log('\n--- Résumé ---');
  console.log(`Total: ${jsFiles.length} fichiers`);
  console.log(`Succès: ${successCount} fichiers`);
  console.log(`Échecs: ${failCount} fichiers`);
  
  // Vérifier spécifiquement le fichier problématique
  const problemFile = 'app/api/market/indices/route.js';
  if (fs.existsSync(problemFile)) {
    console.log('\nVérification spécifique du fichier problématique:');
    console.log(`Contenu de la ligne 24 de ${problemFile}:`);
    
    try {
      const content = fs.readFileSync(problemFile, 'utf8');
      const lines = content.split('\n');
      if (lines.length >= 24) {
        console.log(lines[23]); // ligne 24 (index 23)
        console.log(' '.repeat(19) + '^'); // Pointer vers le caractère 20
      } else {
        console.log(`Le fichier n'a que ${lines.length} lignes.`);
      }
    } catch (error) {
      console.error(`Erreur lors de la lecture de ${problemFile}:`, error.message);
    }
  }
}

main();