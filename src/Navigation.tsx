import {Link} from "react-router-dom";

export const Navigation = () => {
    return (
        <>
            <Link to={"/"}>
                <button>Home</button>
            </Link>
            <Link to={"/recharts"}>
                <button>Recharts</button>
            </Link>
            <Link to={"/victory"}>
                <button>Victory</button>
            </Link>
            <Link to={"/react-chartjs"}>
                <button>React ChartJS</button>
            </Link>
            <Link to={"/react-vis"}>
                <button>React Vis</button>
            </Link>
        </>)
};