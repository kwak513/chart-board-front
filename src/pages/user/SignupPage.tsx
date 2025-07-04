import { LockOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import Title from 'antd/es/typography/Title'
import /*React,*/ { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import navLogo from '../../assets/ChartBoardLogoForNav.png';  
import { userRegister } from '../../api/chartboardApi'

export default function SignupPage() {
    const navigate = useNavigate();

    useEffect(() => {
        //  로그인 되어 있으면 접근 X
        if (sessionStorage.getItem('isLoggedIn') === 'true') {
            alert('이미 로그인 되어 있습니다.');
            navigate('/');
        }
    }, [])


    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');


    //  회원가입 버튼 클릭 시
    const handleSignup = () => {
        // 유효성 검사 
        if (!userId.trim() || !password.trim() || !fullName.trim()) {
            alert("아이디, 비밀번호를 포함한 모든 정보를 입력해주세요."); 
            return;
        }

        // 비밀번호 길이 검사
        if (password.length < 8) {
        alert("비밀번호는 8자 이상이어야 합니다.");
        return;
        }

        const registrationData = {
            username: userId,
            password: password,
            fullName: fullName,
        };

    
        userRegister(registrationData)
            .then((res) => {
                if(res){
                    alert("회원가입 되었습니다.");
                    navigate('/login');

                }
                else{
                    alert("회원가입 실패했습니다.");
                }
            })
            .catch((err) => {
            console.error("userRegister 실패: ", err);
            
            });

    };



    return (
        <>
            {/* 로고 이미지 영역 */}
            <div style={{
                display: 'flex',  
                alignItems: 'center', 
                justifyContent: 'center', 
                marginTop: '40px',
                marginBottom: '40px'
            }}>
                <img 
                    src={navLogo} 
                    alt="타임 차트 회원가입" 
                    style={{ height: 'auto', maxWidth: '150px', marginRight: '10px' }} 
                />
                <Title level={3} style={{ margin: 0 }}>회원가입</Title> 
            </div>

            {/* 회원가입 폼 영역 */}
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
                        
                    />
                </div>

                {/* 닉네임 입력 */}
                <div style={{ marginBottom: '20px', width: '100%' }}>
                    <Input
                        size="large"
                        value={fullName}
                        onChange={(e) => { setFullName(e.target.value) }}
                        placeholder="성명"
                        prefix={<SolutionOutlined />}
                    />
                </div>
                


                {/* 회원가입 버튼 */}
                <div style={{ width: '100%', marginTop: '10px' }}>
                    <Button
                        type="primary"
                        onClick={handleSignup}
                        style={{ width: '100%' }}
                        size="large"
                    >
                        회원가입
                    </Button>
                </div>

                {/* 로그인 링크 */}
                <div style={{ width: '100%', textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
                    <Link to="/login" style={{ color: '#1677ff', fontSize: '0.9em' }}>
                        이미 계정이 있으신가요? 로그인
                    </Link>

                </div>
            </div>
        </>
    )
}
