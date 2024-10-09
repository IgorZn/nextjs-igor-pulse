import Link from "next/link";
import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";

export const metadata = {
    title: 'Igor Property Pulse Home Page',
}

const HomePage = (props) => {
    return <>
        <Hero />
        <InfoBoxes />
    </>
};

export default HomePage;