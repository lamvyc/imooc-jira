import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";

/*
timeLeft: 剩余时间
reset: 重置倒计时
initialTime: 倒计时时间
*/

//优化版-=-解决settTimeout'的时间不精确的问题
const useCountDownJsx = (initialTime = 60) => {
    const [timeLeft, changeTimeLeft] = useState(initialTime)
    useEffect(() => {
        let timerId
        const startTime = Date.now()
        const tick = () => {
            //elapsedTime: 已经过去的时间
            const elapsedTime = Date.now() - startTime
            //timeRemaining: 剩余时间
            //Math.max: 取最大值,目的是防止倒计时出现负数 
            const timeRemaining = Math.max(initialTime - Math.floor(elapsedTime / 1000), 0)
            changeTimeLeft(timeRemaining)

        }

        if (timeLeft > 0) {
            timerId = setTimeout(() => {
                tick()
            }, 1000)
        }

        return () => {
            clearTimeout(timerId)
        }
    }, [initialTime, timeLeft])

    const reset = useCallback(() => {
        changeTimeLeft(initialTime)
    }, [initialTime])

    return { timeLeft, reset }
}

// const useCountDownJsx = (initialTime = 60) => {
//     const [timeLeft, changeTimeLeft] = useState(initialTime)

//     useEffect(() => {
//         let timerId
//         if (timeLeft > 0) {
//             timerId = setTimeout(() => {
//                 changeTimeLeft(timeLeft - 1)
//             }, 1000)
//         }

//         return () => {
//             clearTimeout(timerId)
//         }
//     }, [timeLeft])

//     const reset = useCallback(() => {
//         changeTimeLeft(initialTime)
//     }, [initialTime])

//     return { timeLeft, reset }
// }





export default useCountDownJsx