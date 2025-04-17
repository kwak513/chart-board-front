import { useEffect, useState } from "react";
import { selectAllFromChartInfoTable } from "../../api/chartboardApi";
import { Descriptions, Table } from "antd";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";

const CollectionChartListPage = () => {

    const [collectionChartList, setCollectionChartList] = useState<any[]>([]);
    const [collectionChartTableColumn, setCollectionChartTableColumn] = useState<{ title: string; dataIndex: string; width: string; }[]>([]);
    
    useEffect(() => {
        selectAllFromChartInfoTable()
            .then((list) => { // chartInfoList: [{...}, {...}]
                setCollectionChartList(
                    list.map((item) => {
                        return {...item, key: item.id};
                    })  // 결과 테이블 정보 입력(row)
                );

                setCollectionChartTableColumn([
                    { title: "차트 이름", dataIndex: "chart_name", width: '50%'},
                    { title: "차트 타입", dataIndex: "CHART_TYPE", width: '50%' },
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
        key: string; // 각 행의 고유 키
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