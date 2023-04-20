import React from 'react';
import { useRef, useEffect } from 'react';
//ref高阶用法
//场景三：高阶组件转发


function HOC(Component) {
    class Wrap extends React.Component {
        render() {
            const { forwardedRef, ...otherprops } = this.props
            return <Component ref={forwardedRef}  {...otherprops} />
        }
    }
    return React.forwardRef((props, ref) => <Wrap forwardedRef={ref} {...props} />)
}

class Index extends React.Component {
    render() {
        return <div>hello,world</div>
    }
}

const HocIndex = HOC(Index)


export function HocHome(){
    const refCreate = useRef(null)
    useEffect(() => {
        console.log(refCreate.current)  /* Index 组件实例  */
    }, [])
    return <div><HocIndex ref={refCreate} /></div>
}
