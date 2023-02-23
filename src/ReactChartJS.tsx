import {Navigation} from "./Navigation";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {faker} from "@faker-js/faker";
import {saveAs} from "file-saver";
import {useRef} from "react";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
import 'chartjs-plugin-zoom';


const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Line Chart',
        },
        zoom: {
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true
                },
            },
            pan: {
                enabled: true,
            }
        },
        lineMarker: {
            id: 'lineMarker',
            beforeDatasetsDraw(chart, args, options): boolean | void {
                const {ctx, chartArea: {top, bottom}, scales: {x}} = chart;
                ctx.save();
                
                ctx.beginPath();
                ctx.strokeStyle = "blue";
                ctx.lineWidth = 5;
                ctx.moveTo(x.getPixelForValue(2), top);
                ctx.lineTo(x.getPixelForValue(2), bottom);
                ctx.stroke();
            }
        }
    },
    scales: {
        // multi axis possible (https://www.chartjs.org/docs/latest/samples/line/multi-axis.html)
        y: {
            type: 'linear',
            display: true,
            position: 'left',
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
        }
        
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

let data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisId: "y1"
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisId: "y"
        },
    ],
};

/**
 * @param b64Data
 * @param contentType
 * @param sliceSize
 * @returns {Blob}
 * @link https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 */
const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < slice.length; i += 1) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
};

export const ReactChartJS = () => {
    const chartRef = useRef(null);
    return (
        <>
            <Navigation />
            <div style={{width: "100%", height: "600px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", marginTop: "20px"}}>
                {/* add chartRef to later download it as png */}
                <Line options={options} data={data} ref={chartRef}/>
            </div>
            <button onClick={() => {
                const b64 = chartRef.current!.toBase64Image().replace('data:image/png;base64,', '');
                const content = b64toBlob(b64);
                const file = new File([content], 'Revenue_chart.png', { type: 'image/png' });
                saveAs(file);
            }}>download chartjs chart</button>
        </>
    );
};