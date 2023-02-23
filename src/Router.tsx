import {createBrowserRouter} from "react-router-dom";
import {App} from "./App";
import {Recharts} from "./Recharts";
import {Victory} from "./Victory";
import {ReactChartJS} from "./ReactChartJS";
import {ReactVis} from "./ReactVis";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "recharts",
        element: <Recharts />
    },
    {
        path: "victory",
        element: <Victory />
    },
    {
        path: "react-chartjs",
        element: <ReactChartJS />
    },
    {
        path: "react-vis",
        element: <ReactVis />
    }
])