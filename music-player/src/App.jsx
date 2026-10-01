import { useState } from 'react'
import { MusicPlayer } from './components/MusicPlayer'
import { Route,Routes } from 'react-router-dom'
import { AllSongs } from './components/AllSongs'
import { Playlists } from './components/Playlists'
import { MusicProvider } from './contexts/MusicContext'
import { Navbar } from './components/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <MusicProvider>
    <div className='app'>
      <Navbar />
      <main className='app-main'>
         <div className="player-section">     
          <MusicPlayer />
         </div>
         <div className="content-section">
          <Routes>
            <Route path="/" element={<AllSongs />} />
            <Route path="/playlists" element={<Playlists />} />
          </Routes>
         </div>
      </main>
     </div>
     </MusicProvider>
  )
}

export default App
