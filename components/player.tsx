import { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRecoilState } from "recoil"
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom"
import useSongInfo from "../hooks/useSongInfo"
import useSoptify from "../hooks/useSoptify"
import { ITrack } from "../interfaces/playlist"

import { ReplyIcon, SwitchHorizontalIcon, VolumeOffIcon } from "@heroicons/react/outline"
import { RewindIcon, FastForwardIcon, PlayIcon, PauseIcon, VolumeUpIcon } from "@heroicons/react/solid"

const Player = () => {
    const { data: session } = useSession()
    const { spotifyApi } = useSoptify()
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState)
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)

    const { songInfo }: { songInfo: ITrack } = useSongInfo()
    const [volume, setVolume] = useState(50)

    const fetchCurrentSong = async () => {
        // Get the current song
        if (!songInfo) {
            await spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                setCurrentTrackId(data.body?.item?.id)
            })

            await spotifyApi.getMyCurrentPlaybackState().then(data => {
                setIsPlaying(data.body?.is_playing)
            })
        }
    }
    // Handle Play/Pause
    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then(data => {
            if (data.body?.is_playing) {
                spotifyApi.pause().catch(err => console.error(err.message))
                setIsPlaying(false)
            } else {
                spotifyApi.play().catch(err => console.error(err.message))
                setIsPlaying(true)
            }
        })
    }

    useEffect(() => {
        fetchCurrentSong()
        setVolume(50)
    }, [spotifyApi, session, currentTrackId])
    useEffect(() => {
        if (volume > 0 && volume < 100) {
            debouncedAdjustVolume(volume)
        }
    }, [volume])


    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }
    const debouncedAdjustVolume = useCallback(
        debounce((vol) => {
            spotifyApi.setVolume(vol).catch((err) => console.error(err.message))
        }, 500), []
    )
    return (
        <div className="h-24 text-white bg-gradient-to-b from-black to-gray-900
        grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
            {/* Left */}
            <div className="flex items-center space-x-4">
                <img className="hidden md:inline w-10 h-10" src={songInfo?.album.images?.[0].url} alt={songInfo?.name} />
                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            {/* Center */}
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button" />
                <RewindIcon className="button" />
                {
                    isPlaying ? (
                        <PauseIcon onClick={() => handlePlayPause()} className="button h-10 w-10" />
                    ) : (
                        <PlayIcon onClick={() => handlePlayPause()} className="button h-10 w-10" />

                    )
                }
                <FastForwardIcon className="button" />
                <ReplyIcon className="button" />
            </div>
            {/* Right */}
            <div className="flex items-center space-x-3 md:space-x-4 justify-end">
                <VolumeOffIcon onClick={() => volume > 0 &&
                    setVolume(volume - 10)
                } className="button" />
                <input type="range" className="w-14 md:w-24" onChange={(e) => setVolume(Number(e.target.value))} value={volume} min={0} max={100} />
                <VolumeUpIcon onClick={() => volume < 100 &&
                    setVolume(volume + 10)
                } className="button" />
            </div>
        </div>
    )
}

export default Player
