/** @jsxImportSource @emotion/react */
import React, { useEffect } from "react";
import { css, keyframes } from "@emotion/react";
import createIcon from "../images/createIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useMonth from "../useHooks/useMonth";
import { WrapperProps } from "../App";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";
import { Month } from "../useHooks/useMonth";

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
  font-size: 32px;
  font-family: "Pretendard-Bold";
  letter-spacing: -0.02em;
  width: 11.4em;
  margin-bottom: 0;
  margin-top: -0.5em;
  animation: ${fadeLeft} 1s ease-in-out;
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
  animation: ${fadeUp} 1.8s ease-in-out;
  transition: 0.5s ease-in-out;

  &:hover {
    opacity: 70%;
  }
`;

export const Section = ({ children }: WrapperProps): EmotionJSX.Element => {
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
        row-gap: 2.4em;
        margin-top: -3em;
      `}
    >
      {children}
    </section>
  );
};

const Icon = (): EmotionJSX.Element => {
  return (
    <img
      alt="아이콘 이미지"
      src={createIcon}
      css={css`
        margin-right: 19.5em;
        animation: ${fadeLeft} 1s ease-in-out;
      `}
    />
  );
};

const Title = (props: WrapperProps): EmotionJSX.Element => {
  return <p css={titleStyle} {...props} />;
};

const SubTitle = (props: WrapperProps): EmotionJSX.Element => {
  return (
    <span
      css={css`
        font-size: 14px;
        font-family: "Pretendard-Bold";
        color: #09ce5b;
        letter-spacing: -0.35px;
        width: 26.21em;
      `}
      {...props}
    />
  );
};

interface InputType {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = (props: InputType): EmotionJSX.Element => {
  return (
    <input
      type="text"
      css={css`
        font-size: 13px;
        margin-top: 0.8em;
        padding-left: 0;
        font-family: "Pretendard-Medium";
        border: 0;
        width: 26.21em;
        letter-spacing: -0.35px;

        &:focus {
          outline: none;
        }
      `}
      {...props}
    />
  );
};

export const Button = (props: WrapperProps): EmotionJSX.Element => {
  return <button type="submit" css={buttonStyle} {...props} />;
};

const InputBox = ({ children }: WrapperProps): EmotionJSX.Element => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 0.7em;
        animation: ${fadeLeft} 1.4s ease-in-out;
      `}
    >
      {children}
    </div>
  );
};

export default function Create() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [emotion, setEmotion] = useState<string>("");

  const DateTime: Date = new Date();
  const _Year: number = DateTime.getFullYear();
  const _Month: number = DateTime.getMonth() + 1;
  const _Date: number = DateTime.getDate();

  const array: Month | any = useMonth(_Month);

  const totalDate: number = new Date(_Year, _Month, 0).getDate();

  const totalBubble: object[] = [];

  const navigate = useNavigate();

  for (let i = 1; i <= totalDate; i++) {
    totalBubble.push({ id: i, data: 0 });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.placeholder === "멋진 제목을 입력해주세요!") {
      setTitle(event.target.value);
    }

    if (event.target.placeholder === "멋진 내용을 입력해주세요!") {
      setContent(event.target.value);
    }

    if (event.target.placeholder === "오늘 당신의 기분은 어떠셨나요?") {
      setEmotion(event.target.value);
    }
  };

  const handleSubmit = () => {
    console.log(array[_Date - 1].month, array[_Date - 1].memberId);
    if (window.confirm("게시물을 작성할까요?")) {
      axios
        .put(
          `/post/register`,
          JSON.stringify({
            id: array[_Date - 1].id,
            title: title,
            content: content,
            feeling: emotion,
            month: array[_Date - 1].month,
            date: array[_Date - 1].date,
            memberId: array[_Date - 1].memberId,
            state: true,
          }),
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          navigate("/");
        })
        .catch((error) => {
          alert(`에러 발생,, ${error}`);
        });
    }
  };

  return (
    <Section>
      <Icon />
      <Title>
        {`${_Year}년 ${_Month}월 ${_Date}일`} <br />
        오늘의 일기
      </Title>
      <InputBox>
        <SubTitle>일기 제목</SubTitle>
        <Input
          placeholder="멋진 제목을 입력해주세요!"
          onChange={handleChange}
          value={title}
        ></Input>
      </InputBox>
      <InputBox>
        <SubTitle>일기 내용</SubTitle>
        <Input
          placeholder="멋진 내용을 입력해주세요!"
          onChange={handleChange}
          value={content}
        ></Input>
      </InputBox>
      <InputBox>
        <SubTitle>오늘 하루의 기분</SubTitle>
        <Input
          placeholder="오늘 당신의 기분은 어떠셨나요?"
          onChange={handleChange}
          value={emotion}
        ></Input>
      </InputBox>
      <Button onClick={handleSubmit}>게시글 게시하기</Button>
    </Section>
  );
}
