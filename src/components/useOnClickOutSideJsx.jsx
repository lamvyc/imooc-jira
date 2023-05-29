import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";


/*
ref表示要监听的元素的引用
closeCallback表示点击元素外部的回调函数
*/


const useOnClickOutSide = (ref, closeCallback) => {
    useEffect(() => {
        const callback = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return
            }
            closeCallback()
        }

        document.addEventListener("mousedown", callback)
        document.addEventListener("touchstart", callback)

        return () => {
            document.removeEventListener("mousedown", callback)
            document.removeEventListener("touchstart", callback)
        }
    }, [ref, closeCallback])
}


function Modal({ content }) {
    const ref = useRef()
    const [isModalOpen, changeModalOpen] = useState(false)
    useOnClickOutSide(ref, () => {
        changeModalOpen(false)
    })
    return (
        <div>
            {
                isModalOpen ? (
                    <div ref={ref}>
                        {content}
                    </div>
                ) : null
            }
        </div>
    )
}
