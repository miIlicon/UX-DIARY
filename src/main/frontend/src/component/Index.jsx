/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import profile from '../images/profile.svg';
import greenBubble from '../images/greenBubble.svg';
import defaultBubble from '../images/defaultBubble.svg';


const titleStyle = css`
    font-size : 24px;
    font-family : 'Pretendard-Bold';
    letter-spacing: -0.35px;
    margin-top : 1em;
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
                align-items: center;
            `
        }>
            {children}
        </section>
    )
}

const Profile = () => {
    return (
        <img src={profile} />
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

const BubbleBox = ({ children }) => {
    return (
        <div css={css`
            display : flex;
            flex-wrap : wrap;
            justify-content : center;
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
    const _Month = DateTime.getMonth();
    const _Date = DateTime.getDate() + 1;

    const totalDate = new Date(_Year, _Month, 0).getDate();
    const totalBubble = [];

    for (let i = 1; i <= totalDate; i++) {
        totalBubble.push({ id: i, data: 0 });
    }

    return (
        <Section>
            <Profile />
            <Title>김현우님 오늘의 하루는 어떠셨나요?</Title>
            <Button>오늘의 일기 작성하기</Button>
            <BubbleBox>
                {totalBubble.map((item) => {
                    return (
                        <img src={defaultBubble} />
                    );
                })}
            </BubbleBox>
        </Section>
    )
}