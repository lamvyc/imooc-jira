import React from 'react';
import { useRef, useImperativeHandle, useState } from 'react';
//ref高阶用法
//ref实现组件通信--父组件操控子组件方法(函数组件形式)


/*
useImperativeHandle 接受三个参数：

第一个参数 ref : 接受 forWardRef 传递过来的 ref 。
第二个参数 createHandle ：处理函数，返回值作为暴露给父组件的 ref 对象。
第三个参数 deps :依赖项 deps，依赖项更改形成新的 ref 对象。

*/




// 子组件
function Son(props, ref) {
    console.log(props, ref)//{}ref: (...)get ref: ƒ ()[[Prototype]]: Object cur => this.cur = cur

    const inputRef = useRef(null)
    const [inputValue, setInputValue] = useState('')
    useImperativeHandle(ref, () => {
        const handleRefs = {
            onFocus() {              /* 声明方法用于聚焦input框 */
                inputRef.current.focus()
            },
            onChangeValue(value) {   /* 声明方法用于改变input的值 */
                setInputValue(value)
            }
        }
        return handleRefs
    }, [])
    return <div>
        <input placeholder="请输入内容" ref={inputRef} value={inputValue} />
    </div>
}



//forwardRef 用于转发ref,接受一个函数，函数的第一个参数为props，第二个参数为ref
const ForwarSon = React.forwardRef(Son)
// 父组件
export class Index extends React.Component {
    cur = null
    handerClick() {
        const { onFocus, onChangeValue } = this.cur
        onFocus() // 让子组件的输入框获取焦点
        onChangeValue('let us learn React!') // 让子组件input  
    }
    render() {
        return <div style={{ marginTop: '50px' }} >
            <ForwarSon ref={cur => (this.cur = cur)} />
            <button onClick={this.handerClick.bind(this)} >操控子组件</button>
        </div>
    }
}