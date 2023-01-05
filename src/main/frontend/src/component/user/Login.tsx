import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [id, setId] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const navigate = useNavigate();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.placeholder === "아이디") {
            setId(event.target.value);
        }
        if (event.target.placeholder === "비밀번호") {
            setPw(event.target.value);
        }
    }

    function handleSubmit() {
        axios.post('/user/login', JSON.stringify({
            email: id,
            password: pw,
        }),
            {
                headers: {
                    "Content-type": "application/json",
                },
                withCredentials: true,
            })
            .then((res) => {
                if (res.data.accessToken) {
                    localStorage.setItem('accessToken', res.data.accessToken);
                    console.log("엑세스 토큰 저장 완료!")
                }

                if (res.data.refreshToken) {
                    localStorage.setItem('refreshToken', res.data.refreshToken);
                    console.log("리프레쉬 토큰 저장 완료!")
                }

                // console.log(res.data.accessToken);
                // console.log(res.data.refreshToken);
                localStorage.setItem('test', "hi");
                axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`
                navigate('/');
            })
            .catch((e) => {
                console.log(e.response.data);
                return "이메일 혹은 비밀번호를 확인하세요.";
            });
    }

    return (
        <>
            <input placeholder='아이디' value={id} onChange={handleChange} />
            <input placeholder='비밀번호' value={pw} onChange={handleChange} />
            <button onClick={handleSubmit}>로그인</button>
        </>
    )
}
