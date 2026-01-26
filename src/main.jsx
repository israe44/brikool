import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { supabase } from './lib/supabaseClient'

async function init() {
  try {
    // If the app was redirected back from an OAuth provider, process the URL
    // Supabase v2: getSessionFromUrl handles the redirect callback and sets the session
    if (window.location.search.includes('provider') || window.location.hash.includes('access_token')) {
      await supabase.auth.getSessionFromUrl({ storeSession: true });
      // Optionally remove query/hash to clean URL
      history.replaceState({}, document.title, window.location.pathname);
    }
  } catch (err) {
    console.error('Error processing OAuth callback:', err);
  }

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

init()
