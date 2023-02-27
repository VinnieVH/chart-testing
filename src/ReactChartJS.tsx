import React from "react";
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController, Title, ChartOptions, ChartData,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import faker from 'faker';
import {Navigation} from "./Navigation";
import Zoom from "chartjs-plugin-zoom";
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
    Title,
    Zoom,
    annotationPlugin
);

const arr = [];
for (let i=0; i < 24; i++) {
    for (let j=0; j < 2; j++) {
        arr.push(`${i}:${j === 0 ? `00` : 30*j}`);
    }
}

const getHouse = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 230;
    canvas.height = 210;
    const ctx = canvas.getContext('2d');
    if(ctx) {
        ctx.fillStyle = '#666';
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 10;
        ctx.strokeRect(40, 90, 150, 110);
        ctx.fillRect(95, 140, 40, 60);
        ctx.beginPath();
        ctx.moveTo(15, 90);
        ctx.lineTo(115, 10);
        ctx.lineTo(215, 90);
        ctx.closePath();
        ctx.stroke();
    }

    return canvas;
}

const labels = [...arr];

const options: ChartOptions = {
    plugins: {
        zoom: {
            limits: {
                x: {min: 0, max: 50, minRange: 50},
                y: {min: -200, max: 2000, minRange: 50}
            },
            zoom: {
                wheel: {
                    enabled: true,
                },
                pinch: {
                    enabled: true,
                },
                mode: 'xy'
            },
            pan: {
                enabled: true,
                mode: 'xy'
            }
        },
        annotation: {
            annotations: {
                box1: {
                    type: 'box',
                    xMin: 5,
                    xMax: 30,
                    yMin: -200,
                    yMax: 2000,
                    backgroundColor: 'rgba(255, 99, 132, 0.25)',
                    borderColor: "white"
                },
                line: {
                    type: 'line',
                    scaleID: 'x',
                    value: 20,
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 3,
                    label: {
                        display: true,
                        position: 'start',
                        backgroundColor: 'rgba(245,245,245, 255)',
                        content: getHouse(),
                        width: '10%',
                        height: '10%',
                        borderWidth: 0,
                        font: {
                            size: 10
                        },
                    }
                },
            }
        },
        title: {
            display: true,
            text: "Chart JS",
            color: 'black'
        }
    },
    scales: {
        y: {
            type: 'linear' as const,
            display: true,
            position: 'left',
            min: -40,
            max: 60,
            ticks: {
                stepSize: 5
            },
            grid: {
                display: false
            }
        },
        y1: {
            type: 'linear' as const,
            display: true,
            position: "left",
            min: -300,
            max: 1200,
            ticks: {
                stepSize: 50
            },
            grid: {
                display: false
            }
        },
        y2: {
            type: 'linear' as const,
            display: true,
            position: "left",
            min: -25,
            max: 325,
            ticks: {
                stepSize: 25
            },
            grid: {
                display: false
            }
        },
        y3: {
            type: 'linear' as const,
            display: true,
            position: "left",
            min: -5,
            max: 25,
            ticks: {
                stepSize: 1
            }
        }
    }
}

export const data: ChartData = {
    labels,
    datasets: [
        {
            type: 'line' as const,
            label: 'Dataset 1',
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgb(255, 99, 132)',
            fill: false,
            data: labels.map(() => faker.datatype.number({ min: -30, max: 50 })),
            yAxisID: 'y'
        },
        {
            type: 'bar' as const,
            label: 'Dataset 2',
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgb(75, 192, 192)',
            data: labels.map(() => faker.datatype.number({ min: -200, max: 1000 })),
            yAxisID: 'y1'
        },
        {
            type: 'bar' as const,
            label: 'Dataset 3',
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgb(53, 162, 235)',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 300 })),
            yAxisID: 'y2'
        },
        {
            type: 'line' as const,
            label: 'Dataset 4',
            borderColor: 'rgb(31, 64, 82)',
            backgroundColor: 'rgb(31, 64, 82)',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
            yAxisID: 'y3'
        },
    ],
};

export const ReactChartJS = () => {
    return <>
        <Navigation />
        <div style={{width: 1000, margin: "5% auto"}}>
            <Chart type={'bar'} data={data} options={options}  />
        </div>
            
        </>;
}
