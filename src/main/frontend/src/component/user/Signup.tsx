import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
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
        axios.post(`/user/signup`, JSON.stringify({
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
                console.log(res);
                navigate('/login');
            })
    }

    return (
        <>
            <input placeholder='아이디' value={id} onChange={handleChange} />
            <input placeholder='비밀번호' value={pw} onChange={handleChange} />
            <button onClick={handleSubmit}>회원가입</button>
        </>
    )
}

export default Signup;