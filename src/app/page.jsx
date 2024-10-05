import Link from "next/link";

export const metadata = {
    title: 'Igor Property Pulse Home Page',
}

const HomePage = (props) => {
    return <div>
        <div className="text-3xl">Welcome</div>
        <Link href="/properties">Show Properties</Link>
    </div>
};

export default HomePage;