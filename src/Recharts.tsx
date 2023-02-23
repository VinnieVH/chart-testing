import {Navigation} from "./Navigation";
import {useEffect, useState} from "react";
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceArea, ReferenceLine} from 'recharts';
import {useCurrentPng} from "recharts-to-png";
import {saveAs} from "file-saver";
import {data} from "./data";

const min = 5;
const max = 30;
 
const randomInt = () => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const Recharts = () => {
    const [chartData, setChartData] = useState(data);
    const [getPng, { ref, isLoading }] = useCurrentPng();

    const handleDownload = async () => {
        const png = await getPng();

        // Verify that png is not undefined
        if (png) {
            // Download with FileSaver
            saveAs(png, 'myChart.png');
        }
    };
    useEffect(() => {
        const interval = setInterval(() => setChartData(prevState => [...prevState, {
            name: (parseInt(prevState[prevState.length -1].name) + 1).toString(),         
            "a": randomInt(),
            "b": randomInt(),
            "c": randomInt(),
            "d": randomInt(),
            "e": randomInt(),
            "f": randomInt(),
            "g": randomInt(),
            'h': randomInt(),
            "i": randomInt(),
            "j": randomInt()}]), 
            2000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    
    return(<>
        <Navigation />
            <div style={{marginTop: 20, display: 'flex', justifyContent: 'center'}}>
                {/* live data can be achieved by just changing the array via the state */}
                <LineChart ref={ref} width={1200} height={800} data={chartData.slice(Math.max(chartData.length - 30, 0))}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    {/* Multiple YAxis possible (https://github.com/recharts/recharts/issues/174)*/}
                    <YAxis yAxisId="left" tickCount={35} tickLine={false} domain={[0, 35]} />
                    <YAxis yAxisId="middle" tickCount={35} tickLine={false} domain={[0, 35]} />
                    <YAxis yAxisId="right" tickCount={35} tickLine={true} domain={[0, 35]} />
                    <Tooltip />
                    <Legend />
                    <ReferenceArea yAxisId="right" x1={430} x2={30} y1={0} y2={30} stroke="orange" strokeOpacity={1} isFront={true} alwaysShow={true}/>
                    {/* ReferenceLine can be used to set markers on the line graph. With a custom label that should look like a flag (https://codesandbox.io/s/recharts-custom-label-with-svg-elements-qv3nx)*/}
                    <ReferenceLine yAxisId="right" x="3" stroke="orange" label="xd" />
                    {/* you can access the clicked value via the onClick on activeDot */}
                    <Line yAxisId="right" isAnimationActive={false} strokeWidth={2} activeDot={{r: 5, onClick: (event, payload) => console.log(payload) }} dataKey="a" stroke={"blue"} />
                    <Line yAxisId="right" isAnimationActive={false} strokeWidth={2} activeDot={{r: 5, onClick: (event, payload) => console.log(payload) }} dataKey="b" stroke={"green"} />
                    <Line yAxisId="right" isAnimationActive={false} strokeWidth={2} activeDot={{r: 5, onClick: (event, payload) => console.log(payload) }} dataKey="c" stroke={"purple"} />
                    <Line yAxisId="middle" isAnimationActive={false} strokeWidth={2} activeDot={{ r: 5 }} dataKey="d" stroke={"red"} />
                    <Line yAxisId="middle" isAnimationActive={false} strokeWidth={2} activeDot={{ r: 5 }} dataKey="e" stroke={"lightgoldenrodyellow"} />
                    <Line yAxisId="middle" isAnimationActive={false} strokeWidth={2} activeDot={{ r: 5 }} dataKey="f" stroke={"maroon"} />
                    <Line yAxisId="left" isAnimationActive={false} strokeWidth={2} activeDot={{ r: 5 }} dataKey="g" stroke={"lime"} />
                    <Line yAxisId="left" isAnimationActive={false} strokeWidth={2} activeDot={{ r: 5 }} dataKey="h" stroke={"pink"} />
                    <Line yAxisId="left" isAnimationActive={false} strokeWidth={2} activeDot={{ r: 5 }} dataKey="i" stroke={"yellow"} />
                </LineChart>
                {/* recharts-to-png plugin used for an easy way to download the current recharts chart (https://github.com/brammitch/recharts-to-png) */}
            </div>
            <button onClick={() => handleDownload()}>{isLoading ? 'Downloading...' : 'Download Chart'}</button>
    </>
    );
}