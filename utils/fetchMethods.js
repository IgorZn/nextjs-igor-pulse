import "dotenv/config";

const API_URL = process.env.NEXT_PUBLIC_API_URL || null

export const fetchProperties = async () => {
    if(!API_URL) return []

    return await fetch(`${API_URL}/api/properties`)
        .then(data => {
            return data.json();
        })
        .catch(error => {
            console.log(error);
            return []
        });
};

export const fetchProperty = async (id) => {
    if(!API_URL) return {}

    return await fetch(`${API_URL}/api/properties/${id}`)
        .then(data => {
            return data.json();
        })
        .catch(error => {
            console.log(error);
            return {}
        });
}