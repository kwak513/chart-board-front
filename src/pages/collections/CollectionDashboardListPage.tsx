import { useEffect, useState } from "react";
import { deleteDashboard, insertIntoDashboardInfo, selectCountFromDbConnection, selectFromDashboardInfoTableByUserId } from "../../api/chartboardApi";
import { useNavigate } from "react-router-dom";
import { Button, Input, Modal, Table } from "antd";
import Title from "antd/es/typography/Title";
import { DeleteOutlined } from "@ant-design/icons";

// 대시보드 조회 페이지 (Table 형식)
const CollectionDashboardListPage = () => {
    const [collectionDashboardList, setCollectionDashboardList] = useState<any[]>([]);
    const [collectionDashboardTableColumn, setCollectionDashboardTableColumn] = useState<any[]>([]);

    // 모달 관련
    const [dashboardName, setDashboardName] = useState<string>(''); // 새로운 대시보드 이름
    
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

        selectFromDashboardInfoTableByUserId(userId)
            .then((list) => { // dashboardList = [{"dashboard_name": , "id": }, {}, {} ...]
                setCollectionDashboardList(
                    list.map((item) => {
                        return {...item, key: item.id};
                    })  // 결과 테이블 정보 입력(row)
                );

                setCollectionDashboardTableColumn([
                    { title: "대시보드 이름", dataIndex: "dashboard_name", width: '45%'},
                    { title: "타입", width: '45%', render: () => '대시보드'},
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
                console.log("selectFromDashboardInfoTableByUserId failed" + err);
                alert("저장된 차트 정보를 불러오지 못했습니다.");
            })
    }, [])

    const navigate = useNavigate();

    const handleDashboardTableRowClick = (record: DashboardRecord) => {
        console.log("record: " + JSON.stringify(record));   //record: {"dashboard_name":"\"대시보드 이름1\"","id":1,"key":1}
        navigate("/rowtodashboard", {state: {dashboardData: record}});
    }

    interface DashboardRecord{
        chart_name: string;
        CHART_TYPE: string;
        key: string; // 각 행의 고유 키
    }


    // 대시보드 삭제 버튼 클릭 시, 
        const handleDelete = (dashboardId: number) => {
            if(!window.confirm("대시보드를 삭제하시겠습니까?")){
                return;
            }
    
    
            const userId = Number(sessionStorage.getItem('userTableId'));
    
            // 삭제하는 로직 호출
            deleteDashboard(userId, dashboardId)
                .then((res) => {
                    if(res) {
                        alert("대시보드가 삭제되었습니다..");
    
    
                        // 대시보드 정보 다시 받아오기 (삭제된 거 반영하도록)
                        selectFromDashboardInfoTableByUserId(userId)
                        .then((list) => { // dashboardList = [{"dashboard_name": , "id": }, {}, {} ...]
                            setCollectionDashboardList(
                                list.map((item) => {
                                    return {...item, key: item.id};
                                })  // 결과 테이블 정보 입력(row)
                            );

                            setCollectionDashboardTableColumn([
                                { title: "대시보드 이름", dataIndex: "dashboard_name", width: '45%'},
                                { title: "타입", width: '45%', render: () => '대시보드'},
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
                            console.log("selectFromDashboardInfoTableByUserId failed" + err);
                            alert("저장된 차트 정보를 불러오지 못했습니다.");
                        })

    
    
    
    
    
                        
                    } else {
                        alert("대시보드 삭제 실패했습니다.");
                    }
                })
                .catch((err) => {
                    console.error("deleteDashboard 실패: ", err);
                    alert("서버 오류로 대시보드 삭제 실패했습니다.");
                });
        }
    










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

        const dashboardDto = {
            dashboardName: dashboardName,
            userId: Number(sessionStorage.getItem('userTableId')),
        }


        insertIntoDashboardInfo(dashboardDto)
            .then((bool) => {
                if(bool){
                    alert("대시보드를 추가했습니다.")

                    const userId = Number(sessionStorage.getItem('userTableId'));

                    selectFromDashboardInfoTableByUserId(userId)
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
                        console.log("selectFromDashboardInfoTableByUserId failed" + err);
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