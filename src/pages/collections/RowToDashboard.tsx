import { Button, Checkbox, Modal } from "antd";
import { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useLocation } from "react-router-dom";
import { insertManyChartsIntoDashboard, selectChartFromDashboard, selectFromChartInfoTableByUserId, updateChartDashboardConnect } from "../../api/chartboardApi";
import DrawBarChartComponent from "../../components/customSqlSearch/DrawBarChartComponent";
import DrawLineChartComponent from "../../components/customSqlSearch/DrawLineChartComponent";
import DrawScatterChartComponent from "../../components/customSqlSearch/DrawScatterChartComponent";


const ResponsiveGridLayout = WidthProvider(Responsive);

// 대시보드 조회 페이지인 CollectionDashboardListPage에서 대시보드명 클릭하면, 대시보드 보여주는 페이지
const RowToDashboard = () => {

    // 대시보드에 차트 추가하기 위한 코드
    interface UserChart {
        id: number;
        chart_name: string;
        CHART_TYPE: string;
    }

    // 1. 사용자의 차트 정보 저장
    const [userCharts, setUserCharts] = useState<UserChart[]>([]);

    // 2. 사용자가 선택한 차트 배열
    const [selectedChartIds, setSelectedChartIds] = useState<number[]>([]);    



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

    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const showModal = () => {
        setIsModalOpen(true);

        // 모달이 열리면, 사용자의 차트 목록 불러오기
        const userId = Number(sessionStorage.getItem('userTableId'));

        selectFromChartInfoTableByUserId(userId)
            .then((res) => {
                // selectFromChartInfoTableByUserId의 결과 중 필요한 부분(id, 차트 이름, 차트 종류만 저장함.)
                const data = res.map((item) => ({
                    id: item.id,
                    chart_name: item.chart_name,
                    CHART_TYPE: item.CHART_TYPE
                }))
                setUserCharts(data);
            })
            .catch((err) => {
                console.log("selectFromChartInfoTableByUserId failed" + err);
                alert("저장된 차트 정보를 불러오지 못했습니다.");
            })
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    
    // 모달에서 OK 누르면, 
    const handleAddCharts = () => {
        if(selectedChartIds.length === 0){
            alert("추가된 차트가 없습니다.")
            return;
        }

        const insertChartsIntoDashboardDto = {
            dashboardInfoId: id,
            chartInfoIds: selectedChartIds
        }
        // 대시보드에 차트 추가하는 로직 호출
        insertManyChartsIntoDashboard(insertChartsIntoDashboardDto)
            .then((bool) => {
                if(bool){
                    alert("대시보드에 차트가 추가되었습니다.");

                    setSelectedChartIds([]);    // 선택된 차트 초기화
                    // 대시보드의 차트 정보 다시 불러오기
                    selectChartFromDashboard(id)
                    .then((list) => {
                        setChartInfo(list);
                        console.log("selectChartFromDashboard 결과: " + JSON.stringify(list));
                    })
                    .catch((err) => {
                        console.log("selectChartFromDashboard failed" + err);
                        alert("대시보드의 차트 정보를 불러오지 못했습니다.")
                    })
                }
                else{
                    alert("대시보드에 차트가 추가되지 않았습니다.");
                    return;
                }
                
            })
            .catch((err) => {
                console.log("insertManyChartsIntoDashboard failed" + err);
                alert("서버 오류로 차트를 저장하지 못했습니다.");
            })

    }

    // 차트의 id와 체크박스 체크 유무를 매개변수로 받고, selectedChartIds 배열을 변경하는 함수
    const onCheck = (id: number, checked: boolean) => {
        // 체크되어있으면 selectedChartIds 배열에 id 추가
        if(checked){
            setSelectedChartIds(prev => [...prev, id]);
        }
        // 체크 안되어있으면 selectedChartIds 배열에서 id 삭제
        else{
            setSelectedChartIds(prev => prev.filter(item => item !== id))
        }
    }



    return (
        <>
            <div>
                <div className='flex justify-end gap-5'>
                    <Button color="primary" variant="outlined" onClick={showModal}>차트 추가</Button>
                    <Button color="primary" variant="outlined" onClick={handleDashboardSaveClick}>위치·크기 저장</Button>
                </div>

                <Modal title="대시보드에 차트 추가" open={isModalOpen} 
                    onOk={() => {
                        handleAddCharts();
                        handleOk();
                    }} 
                    onCancel={handleCancel}>
                        {/* 사용자의 차트 정보를 각각 checkbox로 표시함 */}
                        {userCharts.map((chart) => (
                            <div key={chart.id}>
                                <Checkbox
                                    value={chart.id}
                                    // selectedChartIds에 포함되어있으면 체크, 아니면 체크 X
                                    checked={selectedChartIds.includes(chart.id)}
                                    onChange={(e) => onCheck(chart.id, e.target.checked)}
                                >
                                    {`[${chart.CHART_TYPE}]`} {chart.chart_name} 
                                </Checkbox>
                            </div>
                        ))}





                </Modal>

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