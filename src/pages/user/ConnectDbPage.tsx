import { LinkOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { insertIntoDbConnection } from '../../api/chartboardApi';

export default function ConnectDbPage() {
  const navigate = useNavigate();

  useEffect(() => {
      //  로그인 되어 있으면 접근 X
      if (sessionStorage.getItem('isLoggedIn') !== 'true') {
          alert("로그인이 필요합니다.");
          navigate('/login'); 
      }
  }, [])


  const [jdbcUrl, setJdbcUrl] = useState('');
  const [dbUsername, setDbUsername] = useState('');
  const [dbPassword, setDbPassword] = useState('');

  const handlePasswordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
          handleSaveDbInfo();
      }
  };

  // 저장 버튼 클릭 시
  const handleSaveDbInfo = () => {
    if (!jdbcUrl.trim() || !dbUsername.trim() || !dbPassword.trim()) {
        alert("jdbc url, DB 유저명, 비밀번호를 모두 입력해주세요.");
        return; 
    }

    const dbDto = {
      jdbcUrl: jdbcUrl,
      dbUsername: dbUsername,
      dbPassword: dbPassword,

      userId: Number(sessionStorage.getItem("userTableId"))
    }

    insertIntoDbConnection(dbDto)
    .then((res) => {
        if(res) {
            alert("데이터베이스 정보가 저장되었습니다.");
            navigate('/');
        } else {
            alert("데이터베이스 정보가 저장에 실패했습니다.");
        }
    })
    .catch((err) => {
        console.error("insertIntoDbConnection 실패: ", err);
        alert("서버 오류로 데이터베이스 정보가 저장에 실패했습니다.");
    });
  };
  


  return (
    <>
    <div style={{
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: '40px',
        marginBottom: '40px'
    }}>
        
        <Title level={3} style={{ margin: 0 }}>데이터베이스 연결하기</Title> 
    </div>

    {/* 폼 영역 */}
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '0 auto 40px auto', 
            maxWidth: '400px', 
            padding: '24px 32px', 
            border: '1px solid #d9d9d9', 
            borderRadius: '8px', 
        }}
    >
        {/* jdbc url 입력 */}
        <div style={{ marginBottom: '20px', width: '100%' }}>
            <Input
                size="large"
                value={jdbcUrl}
                onChange={(e) => { setJdbcUrl(e.target.value) }}
                placeholder="jdbc url (ex. jdbc:mariadb://localhost:3306/DB 이름)"
                prefix={<LinkOutlined />}
            />
        </div>

        {/* db username 입력 */}
        <div style={{ marginBottom: '20px', width: '100%' }}>
            <Input
                size="large"
                value={dbUsername}
                onChange={(e) => { setDbUsername(e.target.value) }}
                placeholder="데이터베이스 유저명"
                prefix={<UserOutlined />}
            />
        </div>

        {/* db password 입력 */}
        <div style={{ marginBottom: '20px', width: '100%' }}>
            <Input.Password
                size="large"
                value={dbPassword}
                onChange={(e) => { setDbPassword(e.target.value) }}
                placeholder="데이터베이스 비밀번호"
                prefix={<LockOutlined />}
                onKeyDown={handlePasswordKeyDown} 
            />
        </div>

        {/* 저장 버튼 */}
        <div style={{ width: '100%', marginTop: '10px' }}>
            <Button
                type="primary"
                onClick={handleSaveDbInfo}
                style={{ width: '100%' }}
                size="large"
            >
                로그인
            </Button>
        </div>

        
    </div>
    </>

  )
}
