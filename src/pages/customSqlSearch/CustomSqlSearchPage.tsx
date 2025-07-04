import { BarChartOutlined, DashboardOutlined, DotChartOutlined, LineChartOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, Radio, Table } from "antd";
import { useEffect, useState } from "react";
import { insertIntoChartInfo, selectCountFromDbConnection, showResultTableByCustomQuery } from "../../api/chartboardApi";
import InsertQueryComponent from "../../components/customSqlSearch/InsertQueryComponent";
import SelectChartTypeComponent from "../../components/customSqlSearch/SelectChartTypeComponent";
import InsertChartXYComponent from "../../components/customSqlSearch/InsertChartXYComponent";
import DrawBarChartComponent from "../../components/customSqlSearch/DrawBarChartComponent";
import DrawLineChartComponent from "../../components/customSqlSearch/DrawLineChartComponent";
import DrawScatterChartComponent from "../../components/customSqlSearch/DrawScatterChartComponent";
import AddToDashBoardBtnComponent from "../../components/customSqlSearch/AddToDashBoardBtnComponent";
import { useNavigate } from "react-router-dom";

const CustomSqlSearchPage = () => {

    const navigate = useNavigate();
    
    useEffect(() => {
        //  로그인 안되어있으면 접근 X
        if (sessionStorage.getItem('isLoggedIn') !== 'true') {
            alert("로그인이 필요합니다.");
            navigate('/login'); 
        }

        else{
        
            const userTableId = Number(sessionStorage.getItem("userTableId"));

            console.log("userTableId", userTableId);

            // 데이터베이스 정보를 입력하지 않은 사용자라면, 접근하지 못함. DB 정보 입력 페이지로 navigate
            selectCountFromDbConnection(userTableId)
                .then((res) => {
                    if(!res){
                        alert("데이터베이스 정보가 없습니다.");
                        navigate('/dbconnect');
                    }

                })
                .catch((err) => {
                    console.log("selectAllFromChartInfoTable failed" + err);
                })
        }
    }, [])


    {/* 1. Query 입력 & 제출 버튼 */}
    {/* 2. 결과 테이블 */}

    //  쿼리값
    const [customQuery, setCustomQuery] = useState("");
    // 사용자 쿼리의 결과 테이블 정보(row)
    const [resultTableInfo, setResultTableInfo] = useState([]);
    // 테이블의 column 정보
    const [resultTableColumns, setResultTableColumns] = useState<{ title: string; dataIndex: string }[]>([]);
    
    // 제출 버튼 클릭 시, resultTableInfo에 정보 채우기
    const handleQueryButtonClick = () => {
        const userId = Number(sessionStorage.getItem('userTableId'));
        showResultTableByCustomQuery(customQuery, userId)
        .then((list) => {
            setResultTableInfo(
                list.map((item) => {
                    return {...item, key: item.id};
                })
            ); // 결과 테이블 정보 입력(row)

            const tableColumns = Object.keys(list[0]);  // 결과 테이블의 column 정보 입력
            
            const tableColumnsData = tableColumns.map((tableColumn) => {
            return { title: tableColumn, dataIndex: tableColumn};
            })
            setResultTableColumns(tableColumnsData); 
        })
        .catch((err) => {
            console.log("showResultTableByCustomQuery failed" + err);
            alert("쿼리의 결과 데이터 호출에 실패했습니다.")
        })
    }

    {/*  3. 차트 종류 선택 */}
    const [radioValue, setRadioValue] = useState('');

    {/* 4. 차트별 필요한 입력 값 받기  */}
    const [barX, setBarX] = useState('');
    const [barY, setBarY] = useState('');
    const [barColor, setBarColor] = useState('');

    const [lineX, setLineX] = useState('');
    const [lineY, setLineY] = useState('');
    
    const [scatterX, setScatterX] = useState('');
    const [scatterY, setScatterY] = useState('');
    const [scatterColor, setScatterColor] = useState('');

    const [chartName, setChartName] = useState('');



    {/* 6. '차트 저장' 버튼 */}
    const handleAddChart = () => {
        if(radioValue == "bar"){
            const chartInfoData = 
            {
                "chartType": "bar",
                "resultTableInfo": resultTableInfo,
                "chartName": chartName,
            "chartConfig": {
                "barX": barX ? barX : "",
                "barY": barY ? barY : "",
                "barColor": barColor ? barColor : ""
            },
            userId: Number(sessionStorage.getItem("userTableId"))
            }
            insertIntoChartInfo(chartInfoData)
                .then((res) => {
                    console.log("handleAddChart bar success" + res);
                    alert("차트가 추가되었습니다.")
                })
                .catch((err) => {
                    console.log("handleAddChart bar failed" + err);
                    alert("차트를 추가하지 못했습니다.")
                })

        }
        else if(radioValue == "line"){
            const chartInfoData = 
            {
                "chartType": "line",
                "resultTableInfo": resultTableInfo,
                "chartName": chartName,
            "chartConfig": {
                "lineX": lineX ? lineX : "",
                "lineY": lineY ? lineY : ""
            },
            userId: Number(sessionStorage.getItem("userTableId"))
            }
            insertIntoChartInfo(chartInfoData)
                .then((res) => {
                    console.log("handleAddChart line success" + res);
                    alert("대시보드에 차트가 추가되었습니다.")
                })
                .catch((err) => {
                    console.log("handleAddChart line failed" + err);
                    alert("대시보드에 차트를 추가하지 못했습니다.")
                })
        }
        else if(radioValue == "scatter"){
            const chartInfoData = 
            {
                "chartType": "scatter",
                "resultTableInfo": resultTableInfo,
                "chartName": chartName,
            "chartConfig": {
                "scatterX": scatterX ? scatterX : "",
                "scatterY": scatterY ? scatterY : "",
                "scatterColor": scatterColor ? scatterColor : ""
            },
            userId: Number(sessionStorage.getItem("userTableId"))
            }
            insertIntoChartInfo(chartInfoData)
                .then((res) => {
                    console.log("handleAddChart scatter success" + res);
                    alert("대시보드에 차트가 추가되었습니다.")
                })
                .catch((err) => {
                    console.log("handleAddChart scatter failed" + err);
                    alert("대시보드에 차트를 추가하지 못했습니다.")
                })
        }
    }

    // 모달 관련
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };



    return (
        <>
            {/* 1. Query 입력 & 제출 버튼 */} 
            <InsertQueryComponent customQuery={customQuery} setCustomQuery={setCustomQuery} handleQueryButtonClick={handleQueryButtonClick}/>
            <Divider />

            {/*  2. 결과 테이블 */}
            <Table columns={resultTableColumns} dataSource={resultTableInfo} size="small" pagination={{pageSize: 5}}/>
            {/* <Divider /> */}


            {/* 3. 차트 종류 선택 */}
            {resultTableInfo.length > 0 && <Divider />}
            <SelectChartTypeComponent resultTableInfo={resultTableInfo} radioValue={radioValue} setRadioValue={setRadioValue}/>

            {/* 4. 차트별 필요한 입력 값 받기  */}

            {radioValue == 'bar' &&
                <InsertChartXYComponent setX={setBarX} setY={setBarY} setColor={setBarColor} resultTableColumns={resultTableColumns} radioValue={radioValue}/>
            }
            {radioValue == 'line' &&
                <InsertChartXYComponent setX={setLineX} setY={setLineY} resultTableColumns={resultTableColumns} radioValue={radioValue}/>
            }
            {radioValue == 'scatter' &&
                <InsertChartXYComponent setX={setScatterX} setY={setScatterY} setColor={setScatterColor} resultTableColumns={resultTableColumns} radioValue={radioValue}/>
            }
            {radioValue.length > 0 && <Divider />}
            

            {/* 5. 차트 보여주기*/}
            {radioValue == 'bar' &&
                <DrawBarChartComponent radioValue={radioValue} resultTableInfo={resultTableInfo} barX={barX} barY={barY} barColor={barColor}/>
            }
            {radioValue == 'line' &&
                <DrawLineChartComponent radioValue={radioValue} resultTableInfo={resultTableInfo} lineX={lineX} lineY={lineY}/>
            }
            {radioValue == 'scatter' &&
                <DrawScatterChartComponent radioValue={radioValue} resultTableInfo={resultTableInfo} scatterX={scatterX} scatterY={scatterY} scatterColor={scatterColor}/>
            }
            
            {/* 6. '차트 저장' 버튼 */}
            <AddToDashBoardBtnComponent barX={barX} barY={barY} barColor={barColor} lineX={lineX} lineY={lineY} scatterX={scatterX} scatterY={scatterY} scatterColor={scatterColor} handleAddChart={handleAddChart} isModalOpen={isModalOpen} showModal={showModal} handleOk={handleOk} handleCancel={handleCancel} chartName={chartName} setChartName={setChartName}/>
        </>
    );
}
 
export default CustomSqlSearchPage;