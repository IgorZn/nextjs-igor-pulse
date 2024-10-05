'use client'
import {useRouter} from "next/navigation";

function PropertiesAddPage(props) {
    const router = useRouter();
    return (
        <div>
            <h1>Properties Add Page</h1>
            <p onClick={() => router.push('/properties/add/nested')}>Nested Route</p>
        </div>
    );
}

export default PropertiesAddPage;