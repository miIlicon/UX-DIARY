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

export interface InputType {
    placeholder: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    name: string,
}

export interface Area {
    children: React.ReactNode,
}

export const SignUpArea = ({ children }: Area): EmotionJSX.Element => {
    return (
        <div css={css`
            width : 22.71em;
            display: flex;
            row-gap: 2em;
            flex-direction: column;
        `}>
            {children}
        </div>
    )
}

export const Input = (props: InputType): EmotionJSX.Element => {
    return (
        <input type="text" css={css`
            font-size: 13px;
            height : 4em;
            padding : 0;
            margin-top: -.8em;
            border-top: 0;
            border-left: 0;
            border-right: 0;
            border-width: 0.7px;
            border-color: #636161;
            font-family : 'Pretendard-Medium';
            letter-spacing: -0.35px;

            &:focus {
                outline : none;
            }
        `} {...props} />
    )
}

const ConfirmZone = ({ children }: Area) => {
    return (
        <div css={css`
            display: flex;
            align-items: center;
            justify-content: center;
        `}>
            {children}
        </div>
    )
}

const Warning = (): EmotionJSX.Element => {
    return (
        <p css={css`
        position: absolute;
        font-size: 11px;
        font-family : 'Pretendard-Medium';
        letter-spacing: -0.35px;
        color: #f65b74;
        margin: 0;
        margin-left: -6em;
        `}>
            음..비밀번호가 일치하지 않아요!
        </p>
    )
}

const Correct = (): EmotionJSX.Element => {
    return (
        <p css={css`
        position: absolute;
        font-size: 11px;
        font-family : 'Pretendard-Medium';
        letter-spacing: -0.35px;
        color: #09CE5B;
        margin: 0;
        margin-left: -6em;
        `}>
            비밀번호가 정상적으로 일치해요!
        </p>
    )
}

export default function Signup() {
    const [name, setName] = useState<string>("");
    const [pwC, setPwC] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [pw, setPw] = useState<string>("");
    const [check, setCheck] = useState<boolean>(false);
    const navigate = useNavigate();

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.name === "이름") {
            setName(event.target.value);
        }
        if (event.target.name === "아이디") {
            setId(event.target.value);
        }
        if (event.target.name === "비밀번호") {
            setPw(event.target.value);
        }
        if (event.target.name === "비밀번호 확인") {
            setPwC(event.target.value);

            if (event.target.value !== pw) {
                setCheck(false);
            } else {
                setCheck(true);
            }
        }
    }

    function handleSubmit() {
        if (check === true) {
            if (window.confirm("회원가입을 하시겠어요?!")) {
                axios.post(`/user/signup`, JSON.stringify({
                    name: name,
                    email: id,
                    password: pw,
                }),
                    {
                        headers: {
                            "Content-type": "application/json",
                        },
                    }
                )
                    .then((res) => {
                        alert("회원가입이 성공적으로 완료되었어요!")
                        navigate('/login');
                    })
                    .catch((error) => {
                        alert("회원가입이 실패했어요!");
                        console.log(error);
                    })
            }
        } else {
            alert("비밀번호를 확인해주세요!");
        }
    }


    return (
        <Section>
            <SignUpArea>
                <InputBox>
                    <SubTitle>사용자 이름</SubTitle>
                    <Input name="이름" placeholder='사용할 이름을 입력해주세요' value={name} onChange={handleChange} />
                </InputBox>
                <InputBox>
                    <SubTitle>사용자 이메일</SubTitle>
                    <Input name="아이디" placeholder='사용할 이메일를 입력해주세요' value={id} onChange={handleChange} />
                </InputBox>
                <InputBox>
                    <SubTitle>사용자 비밀번호</SubTitle>
                    <Input name="비밀번호" placeholder='사용할 비밀번호를 입력해주세요' value={pw} onChange={handleChange} />
                </InputBox>
                <InputBox>
                    <ConfirmZone>
                        <SubTitle>비밀번호 확인</SubTitle>
                        {check === true && <Correct />}
                        {check === false && pwC !== "" && <Warning />}
                    </ConfirmZone>
                    <Input name="비밀번호 확인" placeholder='위에서 입력한 비밀번호를 입력해주세요' value={pwC} onChange={handleChange} />
                </InputBox>
                <Button onClick={handleSubmit}>회원가입</Button>
            </SignUpArea>
        </Section>
    )
}