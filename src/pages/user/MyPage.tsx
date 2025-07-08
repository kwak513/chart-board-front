
import { LinkOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { Input } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { selectCountFromDbConnection, selectFromDbConnection } from '../../api/chartboardApi';

export default function MyPage() {
    const navigate = useNavigate();

    interface DbInfo {
        jdbc_url: string;
        db_username: string;
        db_password: string;

    }
    const [dbInfo, setDbInfo] = useState<DbInfo>({
        jdbc_url: "",   
        db_username: "",
        db_password: ""
    });

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

            const userId = Number(sessionStorage.getItem('userTableId'));

            selectFromDbConnection(userId)
                .then((res) => {
                    setDbInfo(res);

                })
                .catch((err) => {
                    console.log("selectAllFromChartInfoTable failed" + err);
                })
        }

        

    }, [])



    return (
        <>
        <div style={{
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginTop: '40px',
            marginBottom: '40px'
        }}>
            
            <Title level={3} style={{ margin: 0 }}>데이터베이스 정보</Title> 
        </div>

        {/* 폼 영역 */}
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0 auto 40px auto', 
                maxWidth: '500px', 
                padding: '24px 32px', 
                border: '1px solid #d9d9d9', 
                borderRadius: '8px', 
            }}
        >
            {/* jdbc url 입력 */}
            <div style={{ marginBottom: '20px', width: '100%' }}>
                <Input
                    size="large"
                    value={dbInfo.jdbc_url}
                    prefix={<LinkOutlined />}
                    readOnly
                />
            </div>

            {/* db username  */}
            <div style={{ marginBottom: '20px', width: '100%' }}>
                <Input
                    size="large"
                    value={dbInfo.db_username}
                    prefix={<UserOutlined />}
                    readOnly
                />
            </div>

            {/* db password  */}
            <div style={{ marginBottom: '20px', width: '100%' }}>
                <Input.Password
                    size="large"
                    value={dbInfo.db_password}
                    prefix={<LockOutlined />}
                    readOnly
                />
            </div>

            
        </div>
        </>
    )
}
