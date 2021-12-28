import { useEffect } from "react"
import SpotifyWebApi from "spotify-web-api-node";
import { signIn, useSession } from "next-auth/react"

import { User } from "next-auth"

interface IUser extends User {
    accessToken: string
}
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});
const useSoptify = () => {


    const { data: session, status } = useSession()
    useEffect(() => {
        if (session) {
            // If there's an error in refresh token then redirect user to login
            if (session.error === "refreshAccessTokenError") {
                signIn()
            }
            const usr = session.user as IUser
            spotifyApi.setAccessToken(usr.accessToken)
        }
    }, [session])

    return { spotifyApi }
}

export default useSoptify
