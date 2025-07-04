import { Card } from "antd";
import { useNavigate } from "react-router-dom";

// 저장된 차트 조회, 대시보드 조회 분기 페이지
const CollectionMainPage = () => {
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