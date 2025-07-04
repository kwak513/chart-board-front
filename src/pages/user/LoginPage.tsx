
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import /*React,*/ { useEffect, useState, type KeyboardEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import navLogo from '../../assets/ChartBoardLogoForNav.png'; 
import { userLogin } from '../../api/chartboardApi';


export default function LoginPage() {
    const navigate = useNavigate();

    useEffect(() => {
        //  로그인 되어 있으면 접근 X
        if (sessionStorage.getItem('isLoggedIn') === 'true') {
            alert("이미 로그인 되어 있습니다.");
            navigate('/'); 
        }
    }, [])

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');


    // 로그인 버튼 클릭 시
    const handleLogin = () => {
        if (!userId.trim() || !password.trim()) {
            alert("이메일과 비밀번호를 모두 입력해주세요.");
            return; 
        }

        const loginDto = {
            username: userId,
            password: password
        }

        userLogin(loginDto)
        .then((res) => {
            if (res != -1) {
                alert("로그인 되었습니다.");

                sessionStorage.setItem('isLoggedIn', 'true');
                sessionStorage.setItem('userTableId', res);
                navigate('/');
            } else {
                alert("아이디 또는 비밀번호를 확인해주세요.");
            }
        })
        .catch((err) => {
            console.error("userLogin 실패: ", err);
            alert("로그인 실패했습니다.");
        });
    };

    const handlePasswordKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
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
        <img 
            src={navLogo} 
            alt="차트 대시보드 로그인" 
            style={{ height: 'auto', maxWidth: '150px', marginRight: '10px' }} 
        />
        <Title level={3} style={{ margin: 0 }}>로그인</Title> 
    </div>

    {/* 로그인 폼 영역 */}
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
        {/* 아이디 입력 */}
        <div style={{ marginBottom: '20px', width: '100%' }}>
            <Input
                size="large"
                value={userId}
                onChange={(e) => { setUserId(e.target.value) }}
                placeholder="아이디"
                prefix={<UserOutlined />}
            />
        </div>

        {/* 비밀번호 입력 */}
        <div style={{ marginBottom: '20px', width: '100%' }}>
            <Input.Password
                size="large"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
                placeholder="비밀번호"
                prefix={<LockOutlined />}
                onKeyDown={handlePasswordKeyDown} 
            />
        </div>

        {/* 로그인 버튼 */}
        <div style={{ width: '100%', marginTop: '10px' }}>
            <Button
                type="primary"
                onClick={handleLogin}
                style={{ width: '100%' }}
                size="large"
            >
                로그인
            </Button>
        </div>

        {/* 회원가입 */}
        <div style={{ width: '100%', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
            <Space split={<span style={{ margin: '0 8px', color: '#ccc' }}>|</span>} style={{ fontSize: '0.9em' }}>
                <Link to="/signup" style={{ color: '#1677ff' }}>
                    회원가입
                </Link>
            </Space>
        </div>
    </div>
    </>
)
}
