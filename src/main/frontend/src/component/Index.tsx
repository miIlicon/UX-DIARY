/** @jsxImportSource @emotion/react */

import { css, keyframes } from "@emotion/react";
import profile from "../images/profile.svg";
import greenBubble from "../images/greenBubble.svg";
import defaultBubble from "../images/defaultBubble.svg";
import { Link, useNavigate } from "react-router-dom";
import useMonth from "../useHooks/useMonth";
import { Month } from "../useHooks/useMonth";
import { WrapperProps } from "../App";
import { useEffect, useState } from "react";
import axios from "axios";

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
  font-size: 24px;
  font-family: "Pretendard-Bold";
  letter-spacing: -0.35px;
  margin-bottom: 1.4em;
`;

const buttonStyle = css`
  font-family: "Pretendard-Bold";
  font-size: 20px;
  width: 18.35em;
  height: 3em;

  border: none;
  border-radius: 10px;
  background-color: #09ce5b;
  color: white;
  letter-spacing: -0.35px;

  cursor: pointer;
  box-shadow: 7px 7px 13px 0px #b7b8b7;
  transition: 0.5s ease-in-out;

  &:hover {
    opacity: 70%;
  }
`;

const Section = ({ children }: WrapperProps) => {
    return (
        <section
            css={css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        animation: ${fadeIn} 1s ease-in-out;
      `}
        >
            {children}
        </section>
    );
};

const Profile = () => {
    return (
        <img
            src={profile}
            alt="사용자 프로필"
            css={css`
        margin: 1em;
      `}
        />
    );
};

const Title = (props: WrapperProps) => {
    return <p css={titleStyle} {...props} />;
};

const Button = (props: WrapperProps) => {
    return <button type="submit" css={buttonStyle} {...props} />;
};

const Bubble = (props: WrapperProps) => {
    return (
        <img
            src={defaultBubble}
            alt="디폴트 버블"
            css={css`
        filter: drop-shadow(2px 2px 3px #b7b8b7);
        cursor: pointer;
      `}
            {...props}
        />
    );
};

const BubbleGreen = () => {
    return (
        <img
            src={greenBubble}
            alt="그린 버블"
            css={css`
        filter: drop-shadow(2px 2px 3px #09ce5b);
        cursor: pointer;
        margin-top: 3px;
      `}
        />
    );
};

const BubbleBox = ({ children }: WrapperProps) => {
    return (
        <div
            css={css`
        display: flex;
        flex-wrap: wrap;
        justify-content: left;
        align-items: center;
        width: 23em;
        white-space: pre-wrap;
        column-gap: 0.4em;
        row-gap: 1em;
        margin-top: 5em;
      `}
        >
            {children}
        </div>
    );
};

export default function Index() {
    const DateTime: Date = new Date();
    const _Year: number = DateTime.getFullYear();
    const _Month: number = DateTime.getMonth() + 1;
    const array: Month | any[] | any = useMonth(_Month);
    const totalDate: number = new Date(_Year, _Month, 0).getDate();
    const totalBubble: object[] = [];
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");

    for (let i = 1; i <= totalDate; i++) {
        totalBubble.push({ id: i, data: 0 });
    }

    const bubbleCheck = (): void => {
        alert("지난 일기는 작성을 할 수가 없어요!");
    };

    function Logout() {
        if (window.confirm("정말 로그아웃 하시겠어요?")) {
            navigate("/login");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    }

    useEffect(() => {
        axios.get(`/user/name`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then((res) => {
                setName(res.data)
            })
    }, [])


    return (
        <Section>
            <Profile />
            <Title>{name}님 오늘의 하루는 어떠셨나요?</Title>
            <Link to="/create">
                <Button>오늘의 일기 작성하기</Button>
            </Link>
            <BubbleBox>
                {array.map((item: any) => {
                    return item.state ? (
                        <Link to={`/complete/${item.id}`} key={item.id}>
                            <BubbleGreen />
                        </Link>
                    ) : (
                        <Bubble onClick={bubbleCheck} />
                    );
                })}
            </BubbleBox>
            <button onClick={Logout}>로그아웃</button>
        </Section>
    );
}
