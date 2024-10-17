import "dotenv/config";

export const fetchProperties = async () => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/properties`)
        .then(data => {
            return data.json();
        })
        .catch(error => {
            console.log(error);
        });
};