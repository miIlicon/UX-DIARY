/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react'
import createIcon from '../images/createIcon.svg';
import styled from '@emotion/styled'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { WrapperProps } from '../App';

/* Type Alias로 해당 타입에 관련된 것들을 제한합니다 */

const fadeUp = keyframes`
    0% {
        transform : translateY(30px);
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
        transform : none;
`;

const fadeLeft = keyframes`
0% {
    transform : translateX(30px);
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
    transform : none;
`;

const titleStyle = css`
    font-size : 32px;
    font-family : 'Pretendard-Bold';
    letter-spacing: -0.02em;
    width : 11.4em;
    margin-bottom : 0;
    margin-top : -0.5em;
    animation : ${fadeLeft} 1s ease-in-out;
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
    animation : ${fadeUp} 1.8s ease-in-out;
    margin : 0;
    transition : 0.5s ease-in-out;

    &:hover {
        opacity : 70%;
    }
    `

const Section = ({ children }: WrapperProps): EmotionJSX.Element => {
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
                align-items: center;
                row-gap : 2.4em;
                margin-top : -3em;
            `
        }>
            {children}
        </section>
    )
}

const Icon = (): EmotionJSX.Element => {
    return (
        <img alt="아이콘 이미지" src={createIcon} css={css`
            margin-right : 19.5em;
            animation : ${fadeLeft} 1s ease-in-out;
        `} />
    )
}

const Title = (props: WrapperProps): EmotionJSX.Element => {
    return (
        <p css={titleStyle} {...props} />
    )
}

const SubTitle = (props: WrapperProps): EmotionJSX.Element => {
    return (
        <span css={css`
            font-size:14px;
            font-family : 'Pretendard-Bold';
            color : #09CE5B;
            letter-spacing: -0.35px;
            width : 26.21em;
        `}{...props} />
    )
}

const Content = (props: WrapperProps): EmotionJSX.Element => {
    return (
        <p css={css`
        font-size: 13px;
        font-family : 'Pretendard-Medium';
        width : 26.21em;
        letter-spacing: -0.35px;
        margin : 0;
        color: #6D6D6D;

        &:focus {
            outline : none;
        }
        `}{...props} />
    )
}

const Button = (props: WrapperProps): EmotionJSX.Element => {
    return (
        <button type="submit" css={buttonStyle} onClick={props.onClick} {...props} />
    )
}

const InputBox = ({ children }: WrapperProps): EmotionJSX.Element => {
    return (
        <div css={css`
        display : flex;
        flex-direction : column;
        row-gap : 0.7em;
        animation : ${fadeLeft} 1.4s ease-in-out;
    `}>
            {children}
        </div>
    );
}

const UtilButton = styled(Button)`
    margin : 0;
    width : 9em;
`;

const ButtonBox = ({ children }: WrapperProps): EmotionJSX.Element => {
    return (
        <div css={css`
        display : flex;
        column-gap : 1em;
        width : 22.93em;
        box-sizing : border-box;
        margin-top : -1em;
        `}>
            {children}
        </div>
    )
}

export default function Complete() {
    const { DiaryId } = useParams<{ DiaryId: string | undefined }>();
    const [year, setYear] = useState<string>("");
    const [month, setMonth] = useState<string>("");
    const [day, setDay] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [emotion, setEmotion] = useState<string>("");
    const navigate = useNavigate();
    // console.log(DiaryId);

    useEffect(() => {
        axios.get(`/post/getPostOfDay?id=${DiaryId}`)
            .then((res) => {
                // console.log(res);
                const test = res.data.date.split("-");
                setYear(() => {
                    return test[0];
                });
                setMonth(() => {
                    return test[1];
                })
                setDay(() => {
                    return test[2];
                })

                setTitle(() => {
                    return res.data.title;
                })

                setContent(() => {
                    return res.data.content;
                })

                setEmotion(() => {
                    return res.data.feeling;
                })
            })
    }, []);

    const handleDelete = (): void => {
        if (window.confirm("정말로 삭제하시겠어요?")) {
            axios.delete(`/post/delete/?id=${DiaryId}`)
                .then((res) => {
                    navigate('/');
                })
        }
    }

    const handleModify = (): void => {
        if (window.confirm("게시물을 수정하러갈까요?")) {
            navigate(`/modify/:DiaryId`);
        }
    }

    return (
        <Section>
            <Icon />
            <Title>
                {`${year}년 ${month}월 ${day}일`} <br />
                오늘의 일기
            </Title>
            <InputBox>
                <SubTitle>일기 제목</SubTitle>
                <Content>{title}</Content>
            </InputBox>
            <InputBox>
                <SubTitle>일기 내용</SubTitle>
                <Content>{content}</Content>
            </InputBox>
            <InputBox>
                <SubTitle>오늘 하루의 기분</SubTitle>
                <Content>{emotion}</Content>
            </InputBox>
            <Link to="/">
                <Button>돌아가기</Button>
            </Link>
            <ButtonBox>
                <Link to={`/modify/${DiaryId}`}>
                    <UtilButton onClick={handleModify}>수정하기</UtilButton>
                </Link>
                <UtilButton onClick={handleDelete}>삭제하기</UtilButton>
            </ButtonBox>
        </Section>
    )
}
