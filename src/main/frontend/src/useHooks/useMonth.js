import { useEffect, useState } from "react";
import axios from "axios";

function useMonth(month) {

    const [bubble, setBubble] = useState([]);

    useEffect(() => {
        axios.get(`/post/getPostOfMonth?month=${month}`)
            .then((res) => {
                setBubble(() => {
                    return res.data
                });
            })
    }, [])

    return bubble;

}

export default useMonth;