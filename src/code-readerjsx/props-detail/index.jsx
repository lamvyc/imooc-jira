import { useDocumentTitle } from "utils";
import React from "react";

/*
详解props
*/
export const PropsDetail = () => {
    useDocumentTitle("代码阅读JSX");

 
    return (
        <> 
            {/* <h2>代码阅读</h2> */}
            <Index />
        </>
    );
};




/* children 组件 */
function ChidrenComponent1(){
    return <div> ③ props 作为一个组件 </div>
}

function ChidrenComponent2(){
    return <div> ⑥render component </div>
}


/* props 接受处理 */
class PropsComponent extends React.Component{
    componentDidMount(){
        console.log(this,'_this')
    }
    render(){
        const {  children , mes , renderName , say ,Component } = this.props
        const renderFunction = children[0]
        const renderComponent = children[2]//react把注释⑤⑥也识别成插槽了
        /* 对于子组件，不同的props是怎么被处理 */
        return <div>
            { mes }
            <button onClick={ () => say() } > change content </button>
            <Component />
            { renderName() }
            { renderFunction() }
            { renderComponent }
        </div>
    }
}
/* props 定义绑定 */
class Index extends React.Component{
    state={  
        mes: "① props 作为一个渲染数据源"
    }
    node = null
    say= () =>  this.setState({ mes:'② props 作为一个回调函数 callback' })
    render(){
        return <div>
            <PropsComponent  
               mes={this.state.mes}  // ① props 作为一个渲染数据源
               say={ this.say  }     // ② props 作为一个回调函数 callback
               Component={ ChidrenComponent1 } // ③ props 作为一个组件
               renderName={ ()=><div> ④ props 作为渲染函数 </div> } // ④ props 作为渲染函数
            >
                { ()=> <div>⑤render props</div>  } { /* ⑤render props */ }
               <ChidrenComponent2 />          { /* ⑥render component */ }
            </PropsComponent>
        </div>
    }
}


