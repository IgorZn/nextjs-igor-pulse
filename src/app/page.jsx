import Hero from '@/components/Hero'
import InfoBoxes from '@/components/InfoBoxes'
import HomeProperties from '@/components/HomeProperties'
import { fetchProperties } from '@/../utils/fetchMethods'

export const metadata = {
    title: 'Igor Property Pulse Home Page',
}

const HomePage = async (props) => {
    const properties = await fetchProperties(process.env.NEXT_PUBLIC_API_URL)
    return (
        <>
            <Hero />
            <InfoBoxes />
            <HomeProperties properties={properties} />
        </>
    )
}

export default HomePage
