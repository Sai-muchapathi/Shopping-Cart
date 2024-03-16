import "../loading.css";
import { PulseLoader } from "react-spinners";

export function Loading() {
    return (
        <div className="loading-spinner">
            <PulseLoader color="#00bcd4" size={15} margin={2} />
            <div>Loading....</div>
        </div>
    );
}

