import {
    HeartIcon,
    HomeIcon, LibraryIcon, PlusCircleIcon, RssIcon, SearchIcon,
} from "@heroicons/react/outline"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { playlistIdState } from "../atoms/playlistAtom"
import useSoptify from "../hooks/useSoptify"

const Sidebar = () => {
    const { data: session, status } = useSession()
    const [playlists, setPlaylist] = useState([])

    const [_, setPlaylistId] = useRecoilState(playlistIdState)
    const { spotifyApi } = useSoptify()

    useEffect(() => {
        spotifyApi.getUserPlaylists().then(data => {
            setPlaylist(data.body.items)
        })
    }, [session, spotifyApi])

    return (
        <div className="pb-36 text-gray-500 p-5 border-r border-gray-900 overflow-y-scroll h-screen text-xs lg:text-sm hidden md:inline-flex min-w-[12rem] lg:min-w-[15rem] scrollbar-hide">
            <div className="space-y-4">
                {/* <button onClick={() => signOut({
                    callbackUrl: "/login"
                })} className="flex items-center space-x-2 hover:text-white">
                    <p >Logout</p>
                </button > */}
                <button className="flex items-center space-x-2 hover:text-white">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button >
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />

                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button >
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5" />
                    <p>Liked Songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5" />
                    <p>Your episode</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />
                {playlists.map((playlist) => (
                    <div key={playlist.id}>
                        <button onClick={() => setPlaylistId(playlist.id)}>
                            <p className="cursor-pointer hover:text-white">{playlist.name}</p>
                        </button>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Sidebar
