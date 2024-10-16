export const GET = async (request) => {
    try {
        return new Response('OK', { status: 200 })
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 })
    }
}