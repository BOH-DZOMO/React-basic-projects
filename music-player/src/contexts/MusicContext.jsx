
import { useState, createContext, useContext } from "react";
    
const songs = [
{
  id: 1,
  title: "GA_SHI_NAN",
  artist: "Kaestrings",
  url: "/songs/GA_SHI_NAN.mp3",
  duration: "11:34",
},
{
  id: 2,
  title: "Haske",
  artist: "Kaestrings",
  url: "/songs/Haske.mp3",
  duration: "7:34",
},
{
  id: 3,
  title: "Let_it_Show",
  artist: "Kaestrings",
  url: "/songs/Let_it_Show.mp3",
  duration: "8:00",
},
{
  id: 4,
  title: "Tare",
  artist: "Kaestrings",
  url: "/songs/Tare.mp3",
  duration: "7:48",
},
{
  id: 5,
  title: "Walk_On_Water",
  artist: "Kaestrings",
  url: "/songs/Walk_On_Water.mp3",
  duration: "8:58",
},
];

const MusicContext = createContext(null)

export const MusicProvider = ({children}) => {
 
      const [allSongs, setAllSongs] = useState(songs)
      const [currentTrack,setCurrentTrack] = useState(songs[0])
      const [currentTrackIndex,setCurrentTrackIndex] = useState(0)
      const [currentTime,setCurrentTime] = useState(0)
      const [duration,setDuration] = useState(0)
      const [isPlaying,setIsPlaying] = useState(false)
      const [volume,setVolume] = useState(0.5)
      const [Playlists,setPlaylists] = useState([])
    
    
      const handlePlaySong = (song, index) => {
        setCurrentTrack(song)
        setCurrentTrackIndex(index)
      }
    
      const nextTrack = () => {
        setCurrentTrackIndex((prev) => {
          const nextIndex = (prev + 1) % allSongs.length
          setCurrentTrack(allSongs[nextIndex])
          return nextIndex
        });
        setIsPlaying(false)
      }
    
        const prevTrack = () => {
        setCurrentTrackIndex((prev) => {
          const nextIndex = prev === 0 ? allSongs.length -1 : (prev - 1)
          setCurrentTrack(allSongs[nextIndex])
          return nextIndex
        });
        setIsPlaying(false)
    
      }
    
      const formatTime = (time) => {
        if (isNaN(time) || time === undefined)  return "0:00"
    
        const minutes = Math.floor(time /60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
      }
    
      const play = () => setIsPlaying(true)
      const pause = () => setIsPlaying(false)

      const cretePlaylist = (name) => {
        
      }
    
      return (
        <MusicContext.Provider value={{allSongs, currentTrack, currentTrackIndex, handlePlaySong,currentTime, setCurrentTime, formatTime, duration, setDuration,isPlaying,play,pause,nextTrack,prevTrack,volume,setVolume}}>
          {children}
        </MusicContext.Provider>
           
      )
      
    } 

    export const useMusic = () => {
      const contextValue = useContext(MusicContext);
      if (!contextValue) {
        throw new Error("useMusic must be used inside of MusicProvider")
      }
      return contextValue
    }
