'use client'
import {ScaleLoader} from "react-spinners";

function Loading(props) {
    const override = {
        display: "block",
        margin: "100px auto",
    }

    return (
        <div className="container-xl lg:container m-auto text-center">
            <ScaleLoader
                loading={true}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
            />
        </div>

    );
}

export default Loading;