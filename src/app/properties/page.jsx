import PropertiesCard from "@/components/PropertiesCard";
import {fetchProperties} from "@/../utils/fetchMethods";


const PropertiesPage = async (props) => {
    const properties = await fetchProperties();
    return (
        <>
            <section className={"px-4 py-6"}>
                <div className={"container-xl lg:container m-auto px-4 py-6"}>
                    {properties.length === 0
                        ? (<p>No properties found.</p>)
                        : (<div className={"grid grid-cols-1 lg:grid-cols-3 gap-6"}>
                            {properties.map((property) => (
                                <PropertiesCard key={property._id} {...property}/>
                            ))}
                        </div>)}
                </div>
            </section>
        </>
    );
}

export default PropertiesPage;