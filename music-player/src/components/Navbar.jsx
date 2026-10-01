import { Link, useLocation } from "react-router-dom"
import { MusicPlayer } from "./MusicPlayer"

export const Navbar = ()=> {
    const location = useLocation()
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link className="brand-link" to="/">
                Music PLayer
                </Link>
            </div>
            <div className="navbar-links">
                <Link className={`nav-link ${location.pathname === "/" ? "active" : "" }`} to="/">
                All Songs
                </Link>
            </div>
            <div className="navbar-links">
                <Link className={`nav-link ${location.pathname === "/playlist" ? "active" : "" }`} to="/playlists">
                Playlist
                </Link>
            </div>
        </nav>
    )
}