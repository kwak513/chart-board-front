import { useEffect, useState } from "react";
import { deleteChart, selectCountFromDbConnection, selectFromChartInfoTableByUserId } from "../../api/chartboardApi";
import { Button, Descriptions, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

// 저장된 차트 조회 페이지 (Table 형식)
const CollectionChartListPage = () => {

    const [collectionChartList, setCollectionChartList] = useState<any[]>([]);
    const [collectionChartTableColumn, setCollectionChartTableColumn] = useState<any[]>([]);
    
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



        const userId = Number(sessionStorage.getItem('userTableId'));

        selectFromChartInfoTableByUserId(userId)
            .then((list) => { // chartInfoList: [{...}, {...}]
                setCollectionChartList(
                    list.map((item) => {
                        return {...item, key: item.id};
                    })  // 결과 테이블 정보 입력(row)
                );

                setCollectionChartTableColumn([
                    { title: "차트 이름", dataIndex: "chart_name", width: '45%'},
                    { title: "차트 타입", dataIndex: "CHART_TYPE", width: '45%' },
                    { title: "삭제", width: '10%', 
                        render: (_: any, record: any) => (
                            <Button 
                                type="text"
                                icon={<DeleteOutlined />} 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(record.key)
                                }}
                            />
                        )
                    }
                ]);
            })
            .catch((err) => {
                console.log("selectAllFromChartInfoTable failed" + err);
                alert("저장된 차트 정보를 불러오지 못했습니다.");
            })
    }, [])

    const navigate = useNavigate();

    const handleChartTableRowClick = (record: ChartRecord) => {
        console.log("record: " + JSON.stringify(record));   // record: {"chart_name": , "CHART_CONFIG": , "CHART_TYPE": , "RESULT_TABLE_INFO": ,}
        navigate("/rowtochart", {state: {chartData: record}});
    }

    interface ChartRecord{
        chart_name: string;
        CHART_TYPE: string;
        CHART_CONFIG: object;
        RESULT_TABLE_INFO: any[];
        key: string; // 각 행의 고유 키
    }

    // 차트 삭제 버튼 클릭 시, 
    const handleDelete = (chartId: number) => {
        if(!window.confirm("차트를 삭제하시겠습니까?")){
            return;
        }


        const userId = Number(sessionStorage.getItem('userTableId'));

        // 삭제하는 로직 호출
        deleteChart(userId, chartId)
            .then((res) => {
                if(res) {
                    alert("차트가 삭제되었습니다..");


                    // 차트 정보 다시 받아오기 (삭제된 거 반영하도록)
                    selectFromChartInfoTableByUserId(userId)
                        .then((list) => { // chartInfoList: [{...}, {...}]
                            setCollectionChartList(
                                list.map((item) => {
                                    return {...item, key: item.id};
                                })  // 결과 테이블 정보 입력(row)
                        );

                            setCollectionChartTableColumn([
                                { title: "차트 이름", dataIndex: "chart_name", width: '45%'},
                                { title: "차트 타입", dataIndex: "CHART_TYPE", width: '45%' },
                                { title: "삭제", width: '10%', 
                                    render: (_: any, record: any) => (
                                        <Button 
                                            type="text"
                                            icon={<DeleteOutlined />} 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(record.key)
                                            }}
                                        />
                                    )
                                }
                            ]);
            })
            .catch((err) => {
                console.log("selectAllFromChartInfoTable failed" + err);
                alert("저장된 차트 정보를 불러오지 못했습니다.");
            })





                    
                } else {
                    alert("차트 삭제 실패했습니다.");
                }
            })
            .catch((err) => {
                console.error("deleteChart 실패: ", err);
                alert("서버 오류로 차트 삭제 실패했습니다.");
            });
    }


    return (
        <>
            <div className="mb-7">
                <Title level={3}>저장된 차트 목록</Title>
            </div>
            
            <Table columns={collectionChartTableColumn} dataSource={collectionChartList} size="small" pagination={{pageSize: 5}}  onRow={(record: ChartRecord) => ({onClick: () => handleChartTableRowClick(record)})}/>
        </>
    );
}
 
export default CollectionChartListPage;