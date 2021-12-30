import { ChevronDownIcon } from "@heroicons/react/outline"
import { signOut, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import { playlistIdState, playlistState } from "../atoms/playlistAtom"
import useSoptify from "../hooks/useSoptify"
// Utils
import { shuffle } from "../lib/shuffleArray"
// Components
import Songs from "./songs"

const Center = () => {
    const { data: session } = useSession()
    const [color, setColor] = useState(null)
    const playlistId = useRecoilValue(playlistIdState)
    const [playlist, setPlaylist] = useRecoilState(playlistState)
    // Spotify api
    const { spotifyApi } = useSoptify()

    useEffect(() => {
        const colors = [
            "from-indigo-500",
            "from-blue-500",
            "from-green-500",
            "from-yellow-500",
            "from-pink-500",
            "from-purple-500",
        ]

        // Suffle Array and pop one value
        setColor(shuffle(colors))
    }, [playlistId])
    useEffect(() => {
        if (spotifyApi.getAccessToken()) {
            spotifyApi.getPlaylist(playlistId).then((data) => {
                setPlaylist(data.body)
            }).catch((err) => console.error("Something went wrong: ", err))
        }
    }, [spotifyApi, playlistId, session])


    return (
        <div className="flex-grow h-screen  overflow-y-scroll relative">
            <header className="absolute right-0 m-5">
                <div
                    onClick={() => signOut({
                        callbackUrl: "/login"
                    })}
                    className="flex items-center bg-gray-100 bg-opacity-50 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                    <img className="rounded-full h-10 w-10" src={session?.user.image ?? "https://pickaface.net/gallery/avatar/unr_random_160817_0304_2mvqp69.png"} alt="" />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            </header >
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black  ${color} h-80 text-white p-8`}>
                <img className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0]?.url} alt={playlist?.name} />
                <div>
                    <p className="uppercase">playlist</p>
                    <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
                </div>
            </section>

            <div className="m-5 px-3">
                <Songs />
            </div>
        </div >
    )
}

export default Center
