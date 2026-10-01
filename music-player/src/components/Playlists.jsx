import { useState } from "react"

export const Playlists = () => {
    const [newPlaylistName, setNewPlaylistName] = useState("")
    return (
    <div className="create-playlist">
        <h2>Playlist</h2>

        <div className="create-playkist">
        <h3>CREATE nEW Playlist</h3>
        <div className="playlist-form">
            <input type="text" className="playlist-input" onChange={(e) => setNewPlaylistName(e.target.value)} value ={newPlaylistName} placeholeder="Playlist form..." />
            <button className="create-btn" onSubmit={handleCreatePlaylist}>Create</button>
        </div>

        </div>
    </div>
    )
}