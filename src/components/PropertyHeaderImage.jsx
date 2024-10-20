import React from 'react';
import Image from "next/image";

function PropertyHeaderImage({images}) {
    const [image] = images
    return (
        <>
            <section>
                <div className="container-xl m-auto">
                    <div className="grid grid-cols-1">
                        <Image
                            src={"/images/properties/" + image}
                            alt=""
                            className="object-cover h-[400px] w-full"
                            width="1800"
                            height="1200"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}

export default PropertyHeaderImage;