import { getProviders, signIn, useSession } from "next-auth/react"

interface IProvider {
    name: string;
    id: string
    callbackUrl: string;
    signinUrl: string;
    type: string;
}

const Login = ({ providers }) => {


    return (
        <div className="h-screen w-full flex justify-center bg-black items-center flex-col">
            <img src="https://links.papareact.com/9xl" className="w-56 mb-5" alt="Spotify" />
            {Object.values(providers).map((provider: IProvider) => {
                return (
                    <div key={provider.name}>
                        <button onClick={() => signIn(provider.id, { callbackUrl: "/" })} className="bg-[#18D860] hover:bg-[#009963] duration-200 p-5 rounded-lg text-white">Login with {provider.name}</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Login


export async function getServerSideProps() {
    const providers = await getProviders()

    return {
        props: {
            providers
        }
    }
}