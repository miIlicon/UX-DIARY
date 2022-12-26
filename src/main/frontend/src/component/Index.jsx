/** @jsxImportSource @emotion/react */

import { css, keyframes } from "@emotion/react"
import profile from '../images/profile.svg';
import greenBubble from '../images/greenBubble.svg';
import defaultBubble from '../images/defaultBubble.svg';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import useMonth from "../useHooks/useMonth";

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.3;
    }
    70% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
`;

const titleStyle = css`
    font-size : 24px;
    font-family : 'Pretendard-Bold';
    letter-spacing: -0.35px;
    margin-bottom : 1.4em;
`

const buttonStyle = css`
    font-family : 'Pretendard-Bold';
    font-size : 20px;
    width : 18.35em;
    height : 3em;
    
    border : none;
    border-radius : 10px;
    background-color: #09CE5B;
    color : white;
    letter-spacing: -0.35px;

    cursor : pointer;
    box-shadow : 7px 7px 13px 0px #B7B8B7;
    transition : 0.5s ease-in-out;

    &:hover {
        opacity : 70%;
    }
`

const Section = ({ children }) => {
    return (
        <section css={
            css`
                position : absolute;
                top : 50%;
                left : 50%;
                transform : translate(-50%, -50%);
                display : flex;
                flex-direction : column;
                justify-content : center;
                align-items : center;
                animation : ${fadeIn} 1s ease-in-out;
            `
        }>
            {children}
        </section>
    )
}

const Profile = () => {
    return (
        <img src={profile} css={css`
            margin : 1em;
        `} />
    )
}

const Title = (props) => {
    return (
        <p css={titleStyle} {...props} />
    )
}

const Button = (props) => {
    return (
        <button type="submit" css={buttonStyle} {...props} />
    )
}

const Bubble = (props) => {
    return (
        <img src={defaultBubble} css={css`
            filter : drop-shadow(2px 2px 3px #B7B8B7);
            cursor : pointer;
        `} {...props} />
    )
}

const BubbleGreen = () => {
    return (
        <img src={greenBubble} css={css`
            filter : drop-shadow(2px 2px 3px #09CE5B);
            cursor : pointer;
            margin-top : 3px;
        `} />
    )
}

const BubbleBox = ({ children }) => {
    return (
        <div css={css`
            display : flex;
            flex-wrap : wrap;
            justify-content : left;
            align-items : center;
            width : 23em;
            white-space : pre-wrap;
            column-gap : 0.4em;
            row-gap : 1em;
            margin-top : 5em;
        `}>
            {children}
        </div>
    )
}

export default function Index() {

    const DateTime = new Date();
    const _Year = DateTime.getFullYear();
    const _Month = DateTime.getMonth() + 1;
    const _Date = DateTime.getDate();
    const array = useMonth(_Month);
    const navigate = useNavigate();
    const totalDate = new Date(_Year, _Month, 0).getDate();
    const totalBubble = [];

    for (let i = 1; i <= totalDate; i++) {
        totalBubble.push({ id: i, data: 0 });
    }

    const bubbleCheck = () => {
        alert("지난 일기는 작성을 할 수가 없어요!");
    }

    return (
        <Section>
            <Profile />
            <Title>김현우님 오늘의 하루는 어떠셨나요?</Title>
            <Link to="/create">
                <Button>오늘의 일기 작성하기</Button>
            </Link>
            <BubbleBox>
                {array.map((item) => {
                    return (
                        item.state ?
                            <Link to={`/complete/${item.id}`} key={item.id}>
                                <BubbleGreen />
                            </Link>
                            : <Bubble onClick={bubbleCheck} />
                    );
                })}
            </BubbleBox>
        </Section>
    )
}