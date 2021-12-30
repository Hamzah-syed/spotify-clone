import { atom } from "recoil"
import { IPlaylist } from "../interfaces/playlist"

export const playlistState = atom({
    key: "playlistState",
    default: null as null | IPlaylist
})


export const playlistIdState = atom({
    key: "playListIdState",
    default: "4UpyDAIi9X6xkp9GGBwkKU"
})