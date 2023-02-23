import {Navigation} from "./Navigation";
import {VictoryChart, VictoryTheme, VictoryLine, VictoryAxis, VictoryArea} from "victory";
import {data, randomInt} from "./data";
import {useEffect, useState} from "react";

export const Victory = () => {
    const [chartData, setChartData] = useState(data);
    // useEffect(() => {
    //     const interval = setInterval(() => setChartData(prevState => [...prevState, {
    //             name: (parseInt(prevState[prevState.length -1].name) + 1).toString(),
    //             "a": randomInt(),
    //             "b": randomInt(),
    //             "c": randomInt(),
    //             "d": randomInt(),
    //             "e": randomInt(),
    //             "f": randomInt(),
    //             "g": randomInt(),
    //             'h': randomInt(),
    //             "i": randomInt(),
    //             "j": randomInt()}]),
    //         2000);
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, []);
    return (
        <>
            <Navigation />
            <VictoryChart
                theme={VictoryTheme.material}
                width={600}
                height={300}
            >
                {/* multiple axis */}
                <VictoryAxis />
                <VictoryAxis dependentAxis offsetX={-20} />
                <VictoryAxis />
                <VictoryLine
                    data={chartData}
                    x="name"
                    y="a"
                />
                {/* mark an area on the graph */}
                <VictoryArea
                    style={{ data: { fill: "#c43a31" } }}
                    data={[{x: 3, y: 30}, {x: 6, y: 30}]}
                />
                <VictoryLine
                    data={chartData}
                    x="name"
                    y="b"
                />
                <VictoryLine
                    data={chartData}
                    x="name"
                    y="c"
                />
                <VictoryLine
                    data={chartData}
                    x="name"
                    y="d"
                />
                <VictoryLine
                    data={chartData}
                    x="name"
                    y="e"
                />
                <VictoryLine
                    data={chartData}
                    x="name"
                    y="f"
                />
                <VictoryLine
                    data={chartData}
                    x="name"
                    y="g"
                />
                <VictoryLine
                    data={chartData}
                    x="name"
                    y="h"
                />
                <VictoryLine
                    data={chartData}
                    x="name"
                    y="i"
                />
                <VictoryLine
                    data={chartData}
                    x="name"
                    y="j"
                />
            </VictoryChart>
        </>
    );
};