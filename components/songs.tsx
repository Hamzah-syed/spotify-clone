import { useRecoilValue } from "recoil"
import { playlistState } from "../atoms/playlistAtom"
// Components
import Song from "./song"

const Songs = () => {

    const playlist = useRecoilValue(playlistState)
    return (
        <div className="text-white">
            {
                playlist?.tracks.items.map((item, i) => (
                    <Song key={item.track.id} track={item.track} order={i} />
                ))
            }
        </div>
    )
}

export default Songs
