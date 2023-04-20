import React from 'react';
//ref高阶用法
//场景一:跨层级获取



// 孙组件
function Son(props) {

    return <div>
        <div> i am alien </div>
        <span ref={props.grandRef} >这个是想要获取元素</span>
    </div>
}
// 父组件
class Father extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props.grandRefs)
        return <div>
            <Son grandRef={this.props.grandRefs} />
        </div>
    }
}
const NewFather = React.forwardRef((props, refs) => {
    /*
        props 参数是组件接收的所有属性对象
        refs  参数是从组件的父组件传递下来的 ref。
    */

    console.log(props)//{xxx: 123}
    console.log(refs)//node => this.node = node

    return <Father grandRefs={refs}  {...props} />
})
// 爷组件
export class GrandFather extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
    }
    node = null
    componentDidMount() {
        console.log(this.node) // <span>这个是想要获取元素</span>
        console.log(this.props)
    }
    render() {
        return <div>
            <NewFather ref={(node) => this.node = node} xxx={123}/>
        </div>
    }
}






