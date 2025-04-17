import { Button } from "antd";
import { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useLocation } from "react-router-dom";
import { selectChartFromDashboard, updateChartDashboardConnect } from "../../api/chartboardApi";
import DrawBarChartComponent from "../../components/customSqlSearch/DrawBarChartComponent";
import DrawLineChartComponent from "../../components/customSqlSearch/DrawLineChartComponent";
import DrawScatterChartComponent from "../../components/customSqlSearch/DrawScatterChartComponent";


const ResponsiveGridLayout = WidthProvider(Responsive);

const RowToDashboard = () => {

    // CollectionDashboardListPage에서 dashboard_info table의 id, dashboard_name 받기
    const location = useLocation();
        const { dashboardData } = location.state || {};
    
        // if (!dashboardData) {
        //     return <div>대시보드 데이터가 없습니다.</div>;
        // }
    
        const {dashboard_name, id} = dashboardData; // dashboard_info table의 id, dashboard_name
    
        console.log("DASHBOARD_INFO TABLE의 dashboard_name:", dashboard_name);
        console.log("DASHBOARD_INFO TABLE의 id:", id);
    
    // 백엔드에서 선택된 대시보드의 차트 정보 가져오기(dashboard_x, dashboard_y, dashboard_w, dashboard_h, CHART_TYPE, RESULT_TABLE_INFO, CHART_CONFIG, chart_name)
    interface ChartInfo{
        dashboard_x: number | null;
        dashboard_y: number | null;
        dashboard_w: number | null;
        dashboard_h: number | null;
        CHART_TYPE: string;
        RESULT_TABLE_INFO: any[];
        CHART_CONFIG: Record<string, any>;
        chart_name: string;
        id: number
    }

    const [chartInfo, setChartInfo] = useState<ChartInfo[]>([]);

    useEffect(() => {
        selectChartFromDashboard(id)
            .then((list) => {
                setChartInfo(list);
                console.log("selectChartFromDashboard 결과: " + JSON.stringify(list));
            })
            .catch((err) => {
                console.log("selectChartFromDashboard failed" + err);
                alert("대시보드의 차트 정보를 불러오지 못했습니다.")
            })
    }, [])

    // 차트 렌더링 부분
    const renderCharts = (info) => {
        const chartConfig = JSON.parse(info.CHART_CONFIG);
        const resultTableInfo = JSON.parse(info.RESULT_TABLE_INFO);

// console.log("info", info)
        
        if(info.CHART_TYPE =="bar"){
            return <DrawBarChartComponent radioValue={info.CHART_TYPE} resultTableInfo={resultTableInfo} barX={chartConfig.barX} barY={chartConfig.barY} barColor={chartConfig.barColor} />
            
        }
        else if(info.CHART_TYPE =="line"){
            return <DrawLineChartComponent radioValue={info.CHART_TYPE} resultTableInfo={resultTableInfo} lineX={chartConfig.lineX} lineY={chartConfig.lineY}/>
        }
        else if(info.CHART_TYPE =="scatter"){
            return <DrawScatterChartComponent radioValue={info.CHART_TYPE} resultTableInfo={resultTableInfo} scatterX={chartConfig.scatterX} scatterY={chartConfig.scatterY} scatterColor={chartConfig.scatterColor} />
        }
    }


    // 차트 크기와 위치 변경
    const [currentLayout, setCurrentLayout] = useState<any[]>([]);

    const handleGridLayoutChange = (layout) => {
        console.log("layout: " + JSON.stringify(layout));   // x, y, w, h 정보
        setCurrentLayout(layout);

    }


    const handleDashboardSaveClick = () => {
        currentLayout.map((layout) => {
            const chartDashboardConnectDto = 
            {
                "dashboardX": layout.x,
                "dashboardY": layout.y,
                "dashboardW": layout.w,
                "dashboardH": layout.h,
                "chartInfoId": layout.i,
                "dashboardInfoId": id,
            }
            updateChartDashboardConnect(chartDashboardConnectDto)
                .then((res) => {
                    console.log("updateChartDashboardConnect success" + res);
                })
                .catch((err) => {
                    console.log("updateChartDashboardConnect failed" + err);
                    // alert("대시보드가 저장 실패했습니다.")
                })
        })
        alert("대시보드가 저장되었습니다.")
    }

    
    return (
        <>
            <div>
                <div className='flex justify-end gap-5'>
                    <Button color="primary" variant="outlined">차트 추가</Button>
                    <Button color="primary" variant="outlined" onClick={handleDashboardSaveClick}>저장</Button>
                </div>

                <ResponsiveGridLayout
                    className="layout"
                    breakpoints={{ lg: 1000, md: 600 }}
                    cols={{ lg: 3, md: 2 }}
                    onLayoutChange={handleGridLayoutChange}
                >
                    {chartInfo.map((info, index) => (
                        <div 
                            key={info.id} 
                            data-grid={{
                                i: String(info.id),
                                x: info.dashboard_x ? info.dashboard_x: index % 3,
                                y: info.dashboard_y ? info.dashboard_y: Math.floor(index / 3),
                                w: info.dashboard_w ? info.dashboard_w: 1,
                                h: info.dashboard_h ? info.dashboard_h: 2,
                                minW: 1,
                                maxW: 3,
                                minH: 2,
                                maxH: 3
                            }}
                        >
                            <div style={{ width: "100%", height: "100%", maxWidth: '100%',maxHeight: '100%' }}
                                onMouseDown={(e) => {
                                    // 클릭 이벤트가 드래그로 전파되지 않게 막기
                                    // e.stopPropagation();
                                }}
                            >
                                {renderCharts(info)}
                            </div>

                    </div>
                ))}
                </ResponsiveGridLayout>
            </div>
        </>
    );
}
 
export default RowToDashboard;