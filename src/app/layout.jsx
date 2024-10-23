import Navbar from "@/components/Navbar";
import '@/assets/style/globals.css';
import SessionWrapper from "@/components/SessionWrapper";

export const metadata = {
    title: 'Igor Property Pulse',
    description: 'find your perfect hata',
    keywords: 'property,rental,search,find',
}

const MainLayout = ({children, session}) => {
    return (
        <SessionWrapper session={session}>
            <html lang="en">
                <body>
                    <Navbar/>
                    <div>{children}</div>
                </body>
            </html>
        </SessionWrapper>
    );
}

export default MainLayout;