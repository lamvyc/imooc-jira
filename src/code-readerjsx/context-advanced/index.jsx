import React from "react";

// 逐层传递Provder
const ThemeContext = React.createContext(null)
function Son2() {
    return <ThemeContext.Consumer>
        {(themeContextValue) => {
            const { color, background } = themeContextValue
            return <div className="sonbox" style={{ color, background }} >  第二层Provder </div>
        }}
    </ThemeContext.Consumer>
}
function Son() {
    const { color, background } = React.useContext(ThemeContext)
    const [themeContextValue2] = React.useState({ color: '#fff', background: 'blue' })
    /* 第二层 Provder 传递内容 */
    return <div className='box' style={{ color, background }} >
        第一层Provder
        <ThemeContext.Provider value={themeContextValue2} >
            <Son2 />
        </ThemeContext.Provider>
    </div>

}

export function ProviderDemo() {
    const [themeContextValue] = React.useState({ color: 'orange', background: 'pink' })
    /* 第一层  Provider 传递内容  */
    return <ThemeContext.Provider value={themeContextValue} >
        <Son />
    </ThemeContext.Provider>
}


/*
Provider 特性总结：

1 Provider 作为提供者传递 context ，provider中value属性改变会使所有消费context的组件重新更新。
2 Provider可以逐层传递context，下一层Provider会覆盖上一层Provider。

*/