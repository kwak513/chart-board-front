import { Chart } from "@antv/g2";
import { useEffect, useRef } from "react";

interface DrawScatterChart{
    radioValue: string,
    resultTableInfo: any[];
    scatterX: string;
    scatterY: string;
    scatterColor: string;
}

const DrawScatterChartComponent = ({radioValue, resultTableInfo, scatterX, scatterY, scatterColor}: DrawScatterChart) => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if(!chartRef.current || radioValue !== 'scatter') return;

        const chart = new Chart({
            container: chartRef.current,
            autoFit: true
        });
    
        chart
        .point()
        .data(resultTableInfo)
    
        if(scatterX.length > 0){
        chart.encode('x', scatterX)
        } 
        if(scatterY.length > 0){
        chart.encode('y', scatterY)
        } 
        
        if(scatterColor.length > 0){
        chart.encode('color', scatterColor)
        } 
    
    
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
    
        }, [resultTableInfo, scatterX, scatterY, scatterColor, radioValue])
    


    return (  
        <div ref={chartRef}  style={{ width: "100%", height: "100%" }}></div>
    );
}
 
export default DrawScatterChartComponent;