import React from 'react';
import { useRef, useEffect } from 'react';
//ref高阶用法

//场景二:合并转发ref

// 表单组件
class Form extends React.Component {
    render() {
        return <input type="text" />
    }
}
// index 组件
class Index extends React.Component {
    componentDidMount() {
        const { forwardRefs } = this.props
        forwardRefs.current = {
            formsx: this.form,      // 给form组件实例 ，绑定给 ref form属性 
            indexsx: this,          // 给index组件实例 ，绑定给 ref index属性 
            buttonsx: this.button,  // 给button dom 元素，绑定给 ref button属性 
        }
    }
    form = null
    button = null
    render() {
        return <div   >
            <Form ref={(form) => this.form = form} />
            <button ref={(button) => this.button = button}  >点击</button>
        </div>
    }
}
const ForwardRefIndex = React.forwardRef((props, ref) => {
    console.log(props, ref)//{} {current: 1}
    return <Index  {...props} forwardRefs={ref} />
})
// home 组件
export function Home() {
    const refCreate = useRef(1)
    useEffect(() => {
        console.log(refCreate.current)//{form: Form, index: Index, button: button}
    }, [])
    return <ForwardRefIndex ref={refCreate} />


}





