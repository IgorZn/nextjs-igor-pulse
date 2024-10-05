'use client'
import {useRouter} from "next/navigation";
import Link from 'next/link';

function PropertiesPage(props) {
    const router = useRouter();
    console.log('Hello')
    return (
        <div>
            <div className="text-3xl">Properties Page</div>
            <p><button onClick={() => router.push('/')}>Home</button></p>
            <p><button onClick={() => router.push('/properties/add')}>Properties Add</button></p>
        </div>
    );
}

export default PropertiesPage;