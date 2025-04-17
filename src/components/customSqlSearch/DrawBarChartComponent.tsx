import { Chart } from "@antv/g2";
import { useEffect, useRef } from "react";

interface DrawBarChart{
    radioValue: string,
    resultTableInfo: any[];
    barX: string;
    barY: string;
    barColor: string;
}

const DrawBarChartComponent = ({radioValue, resultTableInfo, barX, barY, barColor}: DrawBarChart) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if(!chartRef.current || radioValue !== 'bar') return;
    
        const chart = new Chart({
        container: chartRef.current,
        autoFit: true,
        });

        // chart.destroy();
        chart
        .interval()
        .data(resultTableInfo)
    
        if(barX.length > 0){
        chart.encode('x', barX)
        } 
        if(barY.length > 0){
        chart.encode('y', barY)
        } 
        
        if(barColor.length > 0){
        chart.encode('color', barColor)
        } 
        
        chart  
        .transform({ type: 'dodgeX' })
        .interaction('elementHighlight', { background: true });
        
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
    
        }, [resultTableInfo, barX, barY, barColor, radioValue])
    


    return (  
        <div ref={chartRef}  style={{  width: '100%', height: '100%', maxWidth: '100%',maxHeight: '100%'}}></div>
    );
}
 
export default DrawBarChartComponent;