import { Chart } from "@antv/g2";
import { useEffect, useRef } from "react";

interface DrawLineChart{
    radioValue: string,
    resultTableInfo: any[];
    lineX: string;
    lineY: string;
}

const DrawLineChartComponent = ({radioValue, resultTableInfo, lineX, lineY}: DrawLineChart) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if(!chartRef.current || radioValue !== 'line') return;
    
        const chart = new Chart({
            container: chartRef.current,
            autoFit: true,
        });
        
        chart
        .data(resultTableInfo)

        if(lineX.length > 0){
            chart.encode('x', lineX)
        } 
        if(lineY.length > 0){
            chart.encode('y', lineY)
        } 
        
        chart.line().label({
        text: lineY,
        style: {
            dx: -10,
            dy: -12,
        },
        });
        
        chart.point().style('fill', 'white').tooltip(false);
        chart.render();

        const resizeObserver = new ResizeObserver(() => {
        // <div ref={chartRef}> 크기 바뀌면, 차트 사이즈 변경
        chart.changeSize(chartRef.current!.offsetWidth, chartRef.current!.offsetHeight);
        });
    
        resizeObserver.observe(chartRef.current);


        // 차트 렌더링 후, return에서 clean up
        return () => {
        chart.destroy();  // unmount 시 차트 제거
        resizeObserver.disconnect();
        };
    
        }, [resultTableInfo, lineX, lineY, radioValue])
    


    return (  
        <div ref={chartRef}  style={{ width: "100%", height: "100%" }}></div>
    );
}
 
export default DrawLineChartComponent;