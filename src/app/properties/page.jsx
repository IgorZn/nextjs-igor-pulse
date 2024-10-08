'use client'
import {useRouter} from "next/navigation";
import Link from 'next/link';

function PropertiesPage(props) {
    const router = useRouter();
    return (
        <div>
            <div className="text-3xl">Properties Page</div>
            <p><button onClick={() => router.push('/')}>Home</button></p>
            <p><button onClick={() => router.push('/properties/add')}>Properties Add</button></p>
        </div>
    );
}

export default PropertiesPage;