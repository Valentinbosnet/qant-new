const fs = require('fs');
const path = require('path');

// Fonction pour corriger un fichier
function fixFile(filePath) {
  console.log(`Correction du fichier: ${filePath}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Sauvegarde du contenu original
    fs.writeFileSync(`${filePath}.backup`, content, 'utf8');
    
    // Remplacer les motifs problématiques
    const originalContent = content;
    
    // Remplacer .props par ...props
    content = content
      // Cas 1: ({ className, .props}, ref)
      .replace(/$$\{\s*([^{}]*),\s*\.\s*props\s*\}\s*,\s*([^)]*)$$/g, '({ $1, ...props }, $2)')
      
      // Cas 2: ({ className, variant, .props}, ref)
      .replace(/$$\{\s*([^{}]*),\s*([^{}]*),\s*\.\s*props\s*\}\s*,\s*([^)]*)$$/g, '({ $1, $2, ...props }, $3)')
      
      // Cas 3: ({ className, value, .props}, ref)
      .replace(/$$\{\s*([^{}]*),\s*([^{}]*),\s*\.\s*props\s*\}\s*,\s*([^)]*)$$/g, '({ $1, $2, ...props }, $3)')
      
      // Cas 4: {.props}
      .replace(/\{\s*\.\s*props\s*\}/g, '{...props}')
      
      // Cas 5: return { .post, ...
      .replace(/return\s*\{\s*\.\s*(\w+),/g, 'return { ...$1,')
      
      // Cas 6: .insights.slice
      .replace(/\.\s*insights\.slice/g, 'insights.slice');
    
    // Vérifier si des changements ont été effectués
    const hasChanged = originalContent !== content;
    
    if (hasChanged) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fichier corrigé: ${filePath}`);
      return true;
    } else {
      console.log(`ℹ️ Aucun changement nécessaire pour: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Erreur lors de la correction de ${filePath}:`, error.message);
    return false;
  }
}

// Fonction pour trouver tous les fichiers JS/TS
function findFiles(dir, extensions) {
  let results = [];
  const list = fs.readdirSync(dir);
  
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('.next') && !fullPath.includes('.git')) {
      results = results.concat(findFiles(fullPath, extensions));
    } else if (stat.isFile() && extensions.some(ext => file.endsWith(ext))) {
      results.push(fullPath);
    }
  });
  
  return results;
}

// Trouver et corriger tous les fichiers
console.log('Recherche de fichiers à corriger...');
const extensions = ['.js', '.jsx', '.ts', '.tsx'];
const files = findFiles('.', extensions);
console.log(`Trouvé ${files.length} fichiers.`);

let successCount = 0;
files.forEach(file => {
  const success = fixFile(file);
  if (success) successCount++;
});

console.log('\n--- Résumé ---');
console.log(`Total: ${files.length} fichiers`);
console.log(`Corrigés avec succès: ${successCount} fichiers`);
console.log(`Non modifiés ou erreurs: ${files.length - successCount} fichiers`);
