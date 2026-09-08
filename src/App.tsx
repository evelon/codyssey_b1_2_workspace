import { useEffect } from 'react'
import { supabase } from './lib/supabase'

function App() {
  useEffect(() => {
    supabase.from('movie_reviews').select('*').then(console.log)
  }, [])

  return (
    <div>Hello</div>
  )
}

export default App
