import {Navigation} from "./Navigation";
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    LineSeries,
    Crosshair, MarkSeries
} from "react-vis";
const data = [
    {x: 0, y: 8},
    {x: 1, y: 5},
    {x: 2, y: 4},
    {x: 3, y: 9},
    {x: 4, y: 1},
    {x: 5, y: 7},
    {x: 6, y: 6},
    {x: 7, y: 3},
    {x: 8, y: 2},
    {x: 9, y: 0}
];

export const ReactVis = () => {
    return (
        <>
            <Navigation />
            <div style={{width: "100%", height: "600px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", marginTop: "20px"}}>
                <XYPlot height={600} width= {1200}>
                    <Crosshair values={[{x: 2, y: 5}, {x: 2, y: 7}]} />
                    <LineSeries data={data} />
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <MarkSeries
                        data={[{x: 0, y: 0}, {x: 5, y: 5}]}
                        opacity={0}
                        opacityType="linear"
                        color={"red"}
                    />
                    <XAxis />
                    <YAxis />
                    
                </XYPlot>
            </div>
        </>
    );
};