import { ChevronDownIcon } from "@heroicons/react/outline"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
// Utils
import { shuffle } from "../lib/shuffleArray"

const Center = () => {
    const { data: session } = useSession()
    const [color, setColor] = useState(null)
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
    }, [])
    return (
        <div className="flex-grow  relative">
            <header className="absolute right-0 m-5">
                <div className="flex items-center bg-gray-100 bg-opacity-50 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                    <img className="rounded-full h-10 w-10" src={session?.user.image ?? "https://pickaface.net/gallery/avatar/unr_random_160817_0304_2mvqp69.png"} alt="" />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            </header >
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black  ${color} h-80 text-white p-8`}>
                <img src="" alt="" />
            </section>
        </div >
    )
}

export default Center
