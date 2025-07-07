import { Card } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectCountFromDbConnection } from "../../api/chartboardApi";

// 저장된 차트 조회, 대시보드 조회 분기 페이지
const CollectionMainPage = () => {

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
        

    const navigate = useNavigate();

    const handleCard1Click = () => {
        navigate("/chartlist")
    }

    const handleCard2Click = () => {
        navigate("/dashboardlist")
    }


    return (
        <>
            <div className="flex justify-center items-center gap-8 mt-10">
                <Card style={{ width: 300, height: 200, borderColor: '#d0d0d0', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}} onClick={handleCard1Click}>
                    <p style={{ fontSize: '15px', fontWeight: 'bold' }}>저장된 차트 조회</p>
                </Card>
                <Card style={{ width: 300, height: 200, borderColor: '#d0d0d0', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer'}} onClick={handleCard2Click}>
                    <p style={{ fontSize: '15px', fontWeight: 'bold' }}>대시보드 조회</p>
                </Card>
            </div>

            
        </>
    );
}
 
export default CollectionMainPage;