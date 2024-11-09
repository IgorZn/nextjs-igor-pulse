'use client'
import { useParams, useRouter } from 'next/navigation'

function PropertiesAddSlugPage({ params }) {
    const { slug } = useParams()
    const router = useRouter()
    return (
        <div>
            Properties Add Slug Page
            <div className="flex justify-start gap-1">
                <div>Slug:</div>
                <div className={'text-1xl font-bold'}>{slug}</div>
            </div>
            <p onClick={() => router.push('/')}>
                <button className={'border-solid border-2 border-indigo-600'}>
                    Home
                </button>
            </p>
            <p onClick={() => router.back()}>Back</p>
        </div>
    )
}

export default PropertiesAddSlugPage
