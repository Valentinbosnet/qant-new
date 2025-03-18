// Ajoutez cette fonction en haut du fichier
function handleError(error: any, message: string): null {
  if (process.env.NODE_ENV !== 'production') {
    console.error(message, error)
  }
  return null
}

// Puis modifiez vos fonctions pour utiliser cette gestion d'erreur
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single()

    if (error) {
      return handleError(error, 'Error fetching user:')
    }

    return data
  } catch (error) {
    return handleError(error, 'Exception fetching user:')
  }
}

// Faites de même pour les autres fonctions