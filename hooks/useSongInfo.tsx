import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { currentTrackIdState } from "../atoms/songAtom"
import useSoptify from "./useSoptify"

const useSongInfo = () => {
    const { spotifyApi } = useSoptify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [songInfo, setSongInfo] = useState(null)

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentTrackId) {
                const trackInfo = await fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`, {
                    headers: {
                        Authorization: `Bearer ${spotifyApi.getAccessToken()}`
                    }
                }).then(res => res.json()).catch((err) => console.error(err.message))
                setSongInfo(trackInfo)
            }
        }
        fetchSongInfo()
    }, [spotifyApi, currentTrackId])

    return { songInfo }
}

export default useSongInfo
