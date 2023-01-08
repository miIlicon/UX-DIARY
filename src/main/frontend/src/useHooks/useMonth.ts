import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface Month {
    [index: number]: number;
    id: number,
    title: null | string,
    content: null | string,
    feeling: null | string,
    data: null | string,
    state: boolean,
}

/* 해당 달을 가져오는 커스텀 훅 */
function useMonth(month: number): Month | any[] {

    const [bubble, setBubble] = useState<Month | any[]>([]);
    const [token, setToken] = useState(() => {
        return localStorage.getItem('accessToken');
    })
    const [test, setTest] = useState(() => {
        return localStorage.getItem('test');
    })
    const navigate = useNavigate();

    // console.log(token);
    // console.log(test);

    useEffect(() => {
        axios.get(`/post/getPostOfMonth?month=${month}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setBubble(() => {
                    return res.data
                });
            })
            .catch((e) => {
                console.log(e);
                alert("로그인을 해주세요!");
                navigate('/login');
            })
    }, [])

    return bubble;

}

export default useMonth;