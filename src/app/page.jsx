import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import properties from "@/../properties.json"
import connectDB from "@/middleware/mongoDB";

export const metadata = {
    title: 'Igor Property Pulse Home Page',
}

await connectDB()

const HomePage = (props) => {
    return <>
        <Hero/>
        <InfoBoxes/>
        <HomeProperties properties={properties}/>
    </>
};

export default HomePage;