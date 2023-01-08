/** @jsxImportSource @emotion/react */

import React, { ReactNode, useRef } from 'react'
import { css, keyframes } from '@emotion/react'
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { SubTitle } from '../Complete';
import { InputBox } from '../Complete';
import { Button, Section } from '../Create';
import { SignUpArea, Input } from './Signup';
import { Cookies } from 'react-cookie';

export default function Login() {
    const [id, setId] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const navigate = useNavigate();
    const cookie = new Cookies;

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.name === "아이디") {
            setId(event.target.value);
        }
        if (event.target.name === "비밀번호") {
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
                    // localStorage.setItem('refreshToken', res.data.refreshToken);
                    cookie.set('refreshToken', res.data.refreshToken);
                    console.log("리프레쉬 토큰 저장 완료!")
                }

                // console.log(res.data.accessToken);
                // console.log(res.data.refreshToken);
                localStorage.setItem('test', "hi");
                // axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`
                navigate('/');
            })
            .catch((e) => {
                console.log(e.response.data);
                alert("이메일 혹은 비밀번호를 확인하세요.");
            });
    }

    return (
        <>
            <Section>
                <SignUpArea>
                    <InputBox>
                        <SubTitle>사용자 이메일</SubTitle>
                        <Input name="아이디" placeholder='사용할 이메일을 입력해주세요' value={id} onChange={handleChange} />
                    </InputBox>
                    <InputBox>
                        <SubTitle>사용자 비밀번호</SubTitle>
                        <Input name="비밀번호" placeholder='사용할 비밀번호를 입력해주세요' value={pw} onChange={handleChange} />
                    </InputBox>
                    <Button onClick={handleSubmit}>로그인</Button>
                </SignUpArea>
            </Section>
        </>
    )
}
