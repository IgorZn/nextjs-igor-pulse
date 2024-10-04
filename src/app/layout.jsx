import '@/assets/style/globals.css';

export const metadata = {
    title: 'Igor Property Pulse',
    description: 'find your perfect hata',
    keywords: 'property,rental,search,find',
}

const MainLayout = ({children}) => {
  return (
      <html lang="en">
        <body>
          <div>{children}</div>
        </body>
      </html>
  )
}

export default MainLayout;