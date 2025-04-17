import { useEffect, useState } from 'react';
import ResponsiveReactGridLayout from './../../../node_modules/react-grid-layout/lib/ResponsiveReactGridLayout';
import { Responsive, WidthProvider } from "react-grid-layout";
import { insertIntoChartInfoSizePosition, selectAllFromChartInfoTable, selectAllFromChartSizePositionTable } from '../../api/chartboardApi';
import DrawBarChartComponent from '../../components/customSqlSearch/DrawBarChartComponent';
import DrawLineChartComponent from '../../components/customSqlSearch/DrawLineChartComponent';
import DrawScatterChartComponent from '../../components/customSqlSearch/DrawScatterChartComponent';
import { Button } from 'antd';

const ResponsiveGridLayout = WidthProvider(Responsive);



const Collection1Page = () => {
    //  selectAllFromChartInfoTable의 결과(id, chart_type, result_table_info, chart_config)
    const [chartInfo, setChartInfo] = useState<any[]>([]);
    const [chartInfoSizePosition, setChartInfoSizePosition] = useState<any[]>([]);

    /* chartInfoSizePosition
    [
    {
    CHART_CONFIG: "{\"lineX\":\"month_name\",\"lineY\":\"sales_count\"}"
    CHART_TYPE: "line"
    RESULT_TABLE_INFO: "[{\"id\":1,\"month_name\":\"Jan\",\"sales_count\":4000,\"key\":1},{\"id\":2,\"month_name\":\"Feb\",\"sales_count\":3000,\"key\":2},{\"id\":3,\"month_name\":\"Mar\",\"sales_count\":5000,\"key\":3},{\"id\":4,\"month_name\":\"Apr\",\"sales_count\":7000,\"key\":4},{\"id\":5,\"month_name\":\"May\",\"sales_count\":6000,\"key\":5}]"
    dashboard_h: 2
    dashboard_w: 2
    dashboard_x: 1
    dashboard_y: 2
    id: 11
    }, {}, {} , ...]
    */

    useEffect(() => {
        selectAllFromChartInfoTable()
            .then(async (list) => { // chartInfoList: [{...}, {...}]
                setChartInfo(list);

                const layoutList = await Promise.all(   // layoutList: [[{dashboardX: , }], [{dashboardX: , }], ...]
                    list.map((info) => {
                        return selectAllFromChartSizePositionTable(info.id)
                    })
                )

                const merged = list.map((item, idx) => {
                    return (
                        {...item,
                        ...layoutList[idx][0]}
                    );
                })

                setChartInfoSizePosition(merged);
                console.log("merged: ", merged);
            })
            .catch((err) => {
                console.log("selectAllFromChartInfoTable failed" + err);
                alert("저장된 차트 정보를 불러오지 못했습니다.");
            })

    }, [])



    const renderCharts = (info) => {
        const chartConfig = JSON.parse(info.CHART_CONFIG);
        const resultTableInfo = JSON.parse(info.RESULT_TABLE_INFO);

// console.log("info", info)
        
        if(info.CHART_TYPE =="bar"){
            return <DrawBarChartComponent radioValue={info.CHART_TYPE} resultTableInfo={resultTableInfo} barX={chartConfig.barX} barY={chartConfig.barY} barColor={chartConfig.barColor} layoutChange={layoutChange}/>
            
        }
        else if(info.CHART_TYPE =="line"){
            return <DrawLineChartComponent radioValue={info.CHART_TYPE} resultTableInfo={resultTableInfo} lineX={chartConfig.lineX} lineY={chartConfig.lineY} layoutChange={layoutChange}/>
        }
        else if(info.CHART_TYPE =="scatter"){
            return <DrawScatterChartComponent radioValue={info.CHART_TYPE} resultTableInfo={resultTableInfo} scatterX={chartConfig.scatterX} scatterY={chartConfig.scatterY} scatterColor={chartConfig.scatterColor} layoutChange={layoutChange}/>
        }
    }

/*
layout: [
{"w":1,"h":2,"x":0,"y":0,"i":"1","minW":1,"maxW":3,"minH":2,"maxH":3,"moved":false,"static":false},
{"w":1,"h":2,"x":1,"y":0,"i":"2","minW":1,"maxW":3,"minH":2,"maxH":3,"moved":false,"static":false},
{"w":1,"h":2,"x":1,"y":2,"i":"3","minW":1,"maxW":3,"minH":2,"maxH":3,"moved":false,"static":false},
{"w":1,"h":2,"x":1,"y":4,"i":"4","minW":1,"maxW":3,"minH":2,"maxH":3,"moved":false,"static":false}
]
*/
    const [layoutChange, setLayoutChange] = useState(false);
    const [currentLayout, setCurrentLayout] = useState<any[]>([]);

    const handleGridLayoutChange = (layout) => {
        setLayoutChange((prev) => !prev);
        console.log("layout: " + JSON.stringify(layout));   // x, y, w, h 정보
        setCurrentLayout(layout);

    }

    const handleDashboardSaveClick = () => {
        currentLayout.map((layout) => {
            const chartSizePositionDto = 
            {
                "dashboardX": layout.x,
                "dashboardY": layout.y,
                "dashboardW": layout.w,
                "dashboardH": layout.h,
                "chartInfoId": layout.i,
            }
            insertIntoChartInfoSizePosition(chartSizePositionDto)
                .then((res) => {
                    console.log("insertIntoChartInfoSizePosition success" + res);
                })
                .catch((err) => {
                    console.log("insertIntoChartInfoSizePosition failed" + err);
                    // alert("대시보드가 저장 실패했습니다.")
                })
        })
        alert("대시보드가 저장되었습니다.")
    }

    return ( 
        <>
            <div>
                <div className='flex justify-end'>
                    <Button onClick={handleDashboardSaveClick}>저장</Button>
                </div>

                <ResponsiveGridLayout
                    className="layout"
                    // layouts={dashboardLayouts}
                    breakpoints={{ lg: 1000, md: 600 }}
                    cols={{ lg: 3, md: 2 }}
                    onLayoutChange={handleGridLayoutChange}
                >
                    {chartInfoSizePosition.map((info, index) => (
                        <div 
                            key={info.id} 
                            data-grid={{
                                i: String(info.id),
                                x: info.dashboard_x,
                                y: info.dashboard_y,
                                w: info.dashboard_w,
                                h: info.dashboard_h,
                                minW: 1,
                                maxW: 3,
                                minH: 2,
                                maxH: 3
                            }}
                        >
                            {/* {renderCharts(info)} */}
                            <div style={{ width: "100%", height: "100%" }}
                                onMouseDown={(e) => {
                                    // 클릭 이벤트가 드래그로 전파되지 않게 막기
                                    e.stopPropagation();
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
 
export default Collection1Page;