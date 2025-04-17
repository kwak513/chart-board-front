import { useEffect, useState } from "react";
import { insertIntoDashboardInfo, selectAllFromDashboardInfoTable } from "../../api/chartboardApi";
import { useNavigate } from "react-router-dom";
import { Button, Input, Modal, Table } from "antd";
import Title from "antd/es/typography/Title";

const CollectionDashboardListPage = () => {
    const [collectionDashboardList, setCollectionDashboardList] = useState<any[]>([]);
    const [collectionDashboardTableColumn, setCollectionDashboardTableColumn] = useState<{ title: string; dataIndex ?: string; width: string; render ?: () => string}[]>([]);

    // 모달 관련
    const [dashboardName, setDashboardName] = useState<string>(''); // 새로운 대시보드 이름
    
    useEffect(() => {
        selectAllFromDashboardInfoTable()
            .then((list) => { // dashboardList = [{"dashboard_name": , "id": }, {}, {} ...]
                setCollectionDashboardList(
                    list.map((item) => {
                        return {...item, key: item.id};
                    })  // 결과 테이블 정보 입력(row)
                );

                setCollectionDashboardTableColumn([
                    { title: "대시보드 이름", dataIndex: "dashboard_name", width: '50%'},
                    { title: "타입", width: '50%', render: () => '대시보드'},
                ]);
            })
            .catch((err) => {
                console.log("selectAllFromDashboardInfoTable failed" + err);
                alert("저장된 차트 정보를 불러오지 못했습니다.");
            })
    }, [])

    const navigate = useNavigate();

    const handleDashboardTableRowClick = (record) => {
        console.log("record: " + JSON.stringify(record));   //record: {"dashboard_name":"\"대시보드 이름1\"","id":1,"key":1}
        navigate("/rowtodashboard", {state: {dashboardData: record}});
    }

    // interface DashboardRecord{
    //     chart_name: string;
    //     CHART_TYPE: string;
    //     key: string; // 각 행의 고유 키
    // }
    // 모달 관련
    // const [dashboardName, setDashboardName] = useState(''); // 새로운 대시보드 이름
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

    const handleAddNewDashboard = () => {
console.log("dashboardName: ", dashboardName);        
        insertIntoDashboardInfo(dashboardName)
            .then((bool) => {
                if(bool){
                    alert("대시보드를 추가했습니다.")

                    selectAllFromDashboardInfoTable()
                    .then((list) => { // dashboardList = [{"dashboard_name": , "id": }, {}, {} ...]
                        setCollectionDashboardList(
                            list.map((item) => {
                                return {...item, key: item.id};
                            })  // 결과 테이블 정보 입력(row)
                        );
        
                        setCollectionDashboardTableColumn([
                            { title: "대시보드 이름", dataIndex: "dashboard_name", width: '50%'},
                            { title: "타입", width: '50%', render: () => '대시보드'},
                        ]);
                    })
                    .catch((err) => {
                        console.log("selectAllFromDashboardInfoTable failed" + err);
                        alert("저장된 차트 정보를 불러오지 못했습니다.");
                    })



                }
                else{
                    alert("대시보드를 추가하지 못했습니다.")
                }
            })
            .catch((err) => {
                console.log("insertIntoDashboardInfo failed" + err);
                alert("서버 오류로 대시보드를 추가하지 못했습니다.")
            })
    }

    return (
        <>

            <div className="flex justify-between items-center mb-7">
                <Title level={3}>저장된 대시보드 목록</Title>
                <Button type="primary" onClick={showModal}>대시보드 추가</Button>
            </div>

            <Modal title="대시보드 추가" open={isModalOpen} 
                onOk={() => {
                    handleAddNewDashboard();
                    handleOk();
                }} 
                onCancel={handleCancel}>
                <Input value={dashboardName} onChange={(e) => setDashboardName(e.target.value)} placeholder="대시보드 이름"/>
            </Modal>


            <Table columns={collectionDashboardTableColumn} dataSource={collectionDashboardList} size="small" pagination={{pageSize: 5}}  onRow={(record) => ({onClick: () => handleDashboardTableRowClick(record)})}/>
        </>
    );
}

export default CollectionDashboardListPage;