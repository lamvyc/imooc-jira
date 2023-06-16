// import React,
// {
//     useCallback, useEffect
// } from 'react'


// /**********************************************************************类组件****************************************************************************************/
// //类组件：1.容器组件 2.展示组件 
// //3.高阶组件 4.组件复用 5.组件复用的方式  
// class PageContainer extends React.Component {

//     componentDidMount() {
//         // fetch data by ajax
//         fetch('/').then(res => {
//             this.setState({
//                 bannerData: res.banner,
//                 listData: res.list,
//             })
//         })
//     }

//     handleBannerItemClick = () => { }

//     handleClick = () => { }

//     render() {
//         return (
//             <>
//                 <Banner
//                     data={this.state.bannerData}
//                     onClick={this.handleBannerItemClick}
//                 />
//                 <List data={this.state.listData}
//                     onClick={this.handleClick}
//                     renderItem={<></>}
//                 />
//             </>
//         )
//     }
// }
// // Redux Mobx

// const handler = () => { }

// function executeTask(handler) { }
// // react-Query
// // swr

// /*
// 像Banner组件这种模式，实现了业务逻辑与渲染层(UI)的分离，但是Banner组件的复用性不高，因为Banner组件的数据来源是固定的，
// 如果Banner组件的数据来源不固定，那么Banner组件的复用性就会很高，这时候就需要把Banner组件的数据来源抽离出来，
// 这样Banner组件就可以复用了。
// */
// // 1. 抽离Banner组件的数据来源
// // 2. 抽离Banner组件的UI
// // 3. 抽离Banner组件的业务逻辑

// const Banner = () => {
//     const { data, fetch } = useFetch({ path: '/bannerData' })
//     return data.isLoading ? <Loading /> : (
//         <div onClick={() => {
//             fetch()
//         }}>
//             {data.text}
//         </div>
//     )
// }
// /*******************************************************************Hooks*******************************************************************************************/
// // 1. Hooks是什么？ 2. Hooks的使用场景 3. Hooks的使用规则 4. Hooks的使用原理
// // 5. Hooks的使用注意事项 6. Hooks的使用优缺点 7. Hooks的使用实践 8. Hooks的使用案例 9. Hooks的使用总结

// //解耦 1. 业务逻辑与渲染层(UI)的分离 2. 业务逻辑与数据的分离 3. 业务逻辑与组件的分离 4. 业务逻辑与组件的复用的分离 5. 业务逻辑与组件的复用的方式的分离 6. 业务逻辑与组件的复用的方式的抽象的分离 7. 业务逻辑与组件的复用的方式的抽象的封装的分离
// //代数效应 




// const useCountDown = (start) => {
//     const [timeLeft, changeTimeLeft] = useState(start)

//     useEffect(() => {
//         if (timeLeft > 0) {
//             // setTimeout 时间不精确
//             setTimeout(() => {
//                 changeTimeLeft(timeLeft - 1)
//             },
//                 1000)
//         }
//     }, [timeLeft])

//     const reset = useCallback(() => {
//         changeTimeLeft(start)
//     },
//         [])
//     return {
//         timeLeft, reset
//     }
// }
// // 实现 countdown倒计时 React组件
// const Countdown = (start) => {
//     const { timeLeft, reset } = useCountDown(start)
//     return (
//         <div>
//             {timeLeft}
//             <span onClick={reset}>重试</span>
//         </div>
//     )
// }






// {/* <Swiper
//     delay={}
//     loops={ }
//     onSwiper={(slide) => { }
//     }
// />


// <Tabs>
//     <Tab>
//         <div class="bg-slate-100 rounded-xl p-8 dark:bg-slate-800" >
//             <Swiper
//                 delay={ }
//                 loops={ }
//                 onSwiper={(slide) => { }
//                 }
//             >
//                 <SwiperItem>1</SwiperItem>
//                 <SwiperItem>2</SwiperItem>
//                 <SwiperItem>3</SwiperItem>
//             </Swiper>
//         </div>
//     </Tab>
//     <Tab>

//     </Tab>
// </Tabs> */}


// function useOnClickOutSide(ref, closeCallback) {
//     useEffect(() => {
//         const callback = (event) => {
//             if (!ref, current || ref.current.contains(event.target)) {
//                 return
//             }
//             closeCallback()
//         }

//         document.addEventListener("mousedown", callback)
//         document.addEventListener("touchstart", callback)

//         return () => {
//             document.removeEventListener("mousedown", callback)
//             document.removeEventListener("touchstart", callback)
//         }
//     }, [ref, handler])
// }

// function Modal({ content }) {
//     const ref = useRef()
//     const [isModalOpen, changeModalOpen] = useState(false)
//     useOnClickOutSide(ref, () => {
//         changeModalOpen(false)
//     })
//     return (
//         <div>
//             {
//                 isModalOpen ? (
//                     <div ref={ref}>
//                         {content}
//                     </div>
//                 ) : null
//             }
//         </div>
//     )
// }



// // render props pattern
// <Modal title={123123} />
// <Modal title={(123) => 12313123} />

//     // Compound component pattern
//     < Select.Root >
//     <Select.Options>1</Select.Options>
//     <Select.Options>2</Select.Options>
// </Select.Root >

//     antd 5 style in component css in js

// // tailwind css
// const TabsDemo = () => (
//     <Tabs.Root className="TabsRoot" defaultValue="tab1">
//         <Tabs.List className="TabsList" aria-label="Manage your account">
//             <Tabs.Trigger className="TabsTrigger" value="tab1">
//                 Account
//             </Tabs.Trigger>
//             <Tabs.Trigger className="TabsTrigger" value="tab2">
//                 Password
//             </Tabs.Trigger>
//         </Tabs.List>
//         <Tabs.Content className="TabsContent" value="tab1">
//             <p className="Text">Make changes to your account here. Click save when you're done.</p>
//             <fieldset className="Fieldset">
//                 <label className="Label" htmlFor="name">
//                     Name
//                 </label>
//                 <input className="Input" id="name" defaultValue="Pedro Duarte" />
//             </fieldset>
//             <fieldset className="Fieldset">
//                 <label className="Label" htmlFor="username">
//                     Username
//                 </label>
//                 <input className="Input" id="username" defaultValue="@peduarte" />
//             </fieldset>
//             <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
//                 <button className="Button green">Save changes</button>
//             </div>
//         </Tabs.Content>
//         <Tabs.Content className="TabsContent" value="tab2">
//             <p className="Text">Change your password here. After saving, you'll be logged out.</p>
//             <fieldset className="Fieldset">
//                 <label className="Label" htmlFor="currentPassword">
//                     Current password
//                 </label>
//                 <input className="Input" id="currentPassword" type="password" />
//             </fieldset>
//             <fieldset className="Fieldset">
//                 <label className="Label" htmlFor="newPassword">
//                     New password
//                 </label>
//                 <input className="Input" id="newPassword" type="password" />
//             </fieldset>
//             <fieldset className="Fieldset">
//                 <label className="Label" htmlFor="confirmPassword">
//                     Confirm password
//                 </label>
//                 <input className="Input" id="confirmPassword" type="password" />
//             </fieldset>
//             <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
//                 <button className="Button green">Change password</button>
//             </div>
//         </Tabs.Content>
//     </Tabs.Root>
// );

// // Context compound component pattern
// <Counter.Provider value={10}>
//     <Counter.Root onChange={() => { }}>
//         <Coutner.Decrement>-</Coutner.Decrement>
//         <Coutner.Label>计数器</Coutner.Label>
//         <Coutner.Count>{(value) => { }}</Coutner.Count>
//         <Coutner.Increment></Coutner.Increment>
//     </Counter.Root>
// </Counter.Provider>


// // Custom hook pattern
// // useCountDown

// // State reducer pattern
// // 如果你要处理大 Object，或者数据类型比较多，
// // 那我一般建议你用 useReducer

// // const [] = useState({
// // a: 1
// // b: 1
// // c:3
// // d: 1
// // })

// const getTogglerProps = () => {
//     return {
//         props: ref.current
//     }
// }

// // Props getter pattern
// const App1 = () => {
//     const { on, getTogglerProps } = useToggle()
//     return (
//         < div >
//             <Toggle {...getTogglerProps()} />
//         </div >
//     )
// }

// const usePreviousState = () => {

//     const getPreviousState = () => {
//         return ref.current
//     }
//     return {
//         state,
//         setState,
//         getPreviousState,
//     }
// }


// function Banner1() {
//     const { data } = useFetch('/data')
//     return <Banner data={data}></Banner>
// }


// function Swiper1() {
//     const { data } = useFetch('/data')
//     return <Swiper data={data}></Swiper>
// }


// <Page1>
//     <Banner1 />
//     <Swiper1 />
//     <Modal1 />
// </Page1>