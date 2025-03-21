const fs = require('fs');
const path = require('path');

// Fonction pour nettoyer un fichier
function cleanFile(filePath) {
  console.log(`Nettoyage du fichier: ${filePath}`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Sauvegarde du contenu original
    fs.writeFileSync(`${filePath}.backup`, content, 'utf8');
    
    // Remplacer les caractères problématiques
    const originalContent = content;
    
    // Corrections spécifiques
    content = content
      // Corriger module.exports
      .replace(/module\.{3,}exports/g, 'module.exports')
      
      // Corriger les points d'accès aux propriétés
      .replace(/(\w+)\.{3,}(\w+)/g, '$1.$2')
      
      // Corriger les opérateurs de décomposition
      .replace(/\{\s*\.\s*props\s*\}/g, '{.props}')
      .replace(/\{\s*\.\s*rest\s*\}/g, '{.rest}')
      .replace(/\{\s*\.\s*attributes\s*\}/g, '{.attributes}')
      .replace(/\{\s*\.\s*\w+\s*\}/g, (match) => {
        return match.replace(/\.\s*(\w+)/, '.$1');
      })
      
      // Corriger les paramètres de fonction avec décomposition
      .replace(/,\s*\.\s*props\s*\}/g, ', .props}')
      .replace(/,\s*\.\s*rest\s*\}/g, ', .rest}')
      .replace(/,\s*\.\s*\w+\s*\}/g, (match) => {
        return match.replace(/\.\s*(\w+)/, '.$1');
      })
      
      // Corriger les décompositions dans les paramètres de fonction
      .replace(/$$\{\s*([^{}]*),\s*\.\s*(\w+)\s*\}$$/g, '({$1, .$2})')
      .replace(/$$\{\s*([^{}]*)\s*\},\s*(\w+)$$\s*=>/g, '({$1}, $2) =>')
      
      // Corriger les décompositions dans les objets
      .replace(/\{\s*\.\s*(\w+),/g, '{.$1,')
      .replace(/,\s*\.\s*(\w+)\s*\}/g, ', .$1}')
      .replace(/return\s*\{\s*\.\s*(\w+),/g, 'return {.$1,')
      
      // Corriger les points multiples
      .replace(/\.{2,}/g, '.')
      
      // Cas spécial pour .slice, .map, etc.
      .replace(/\.\s*(slice|map|filter|reduce|forEach|join|split|concat|push|pop|shift|unshift|sort|reverse|find|findIndex|some|every|includes|indexOf|lastIndexOf|keys|values|entries)/g, '.$1');
    
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

// Trouver et nettoyer tous les fichiers
console.log('Recherche de fichiers à nettoyer.');
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs'];
const files = findFiles('.', extensions);
console.log(`Trouvé ${files.length} fichiers.`);

let successCount = 0;
files.forEach(file => {
  const success = cleanFile(file);
  if (success) successCount++;
});

console.log('\n--- Résumé ---');
console.log(`Total: ${files.length} fichiers`);
console.log(`Nettoyés avec succès: ${successCount} fichiers`);
console.log(`Non modifiés ou erreurs: ${files.length - successCount} fichiers`);