import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import properties from "@/../properties.json"

export const metadata = {
    title: 'Igor Property Pulse Home Page',
}

const HomePage = (props) => {
    return <>
        <Hero />
        <InfoBoxes />
        <HomeProperties properties={properties}/>
    </>
};

export default HomePage;