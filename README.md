## 其他

**decodeURI()&decodeURIComponent()**

```js
decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码。
decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码

encodeURI用来转译所有的URI
encodeURIComponent只能转移其中的一部分
```

**-----**

```js
npx create-react-app jira --template typescript

**npx可以让你直接使用npm的包而不用直接手动安装**

screens文件夹页面级别的代码

.env//npm run build时webpack会读这个变量(线上)
.env.development//当运行npm start时webpack会读这个变量(本地开发)
//这两个文件与src是同级目录
yarn add qs
```

##  第二章



```
tsconig.json文件夹
"baseUrl": "./src"
绝对路径会去src下去找
```



### 配置json-server

```js
yarn add json-server -D

//package.json文件
"json-server": "json-server __json_server_mock__/db.json --watch"

//改变json-server端口
"json-server": "json-server __json_server_mock__/db.json --watch --port 3001"

//运行
npm run json-server
```



## 第四章

```js
 yarn add @types/qs -D
 
 //qs.stringify基本用法
let params = { c: 'b', a: 'd' };
qs.stringify(params)
 
// 结果是
'c=b&a=d'
```



## 第五章

```js
//https://www.npmjs.com/package/jira-dev-tool
jira-dev-tool


npx imooc-jira-tool//务必使用这个命令安装
**package.json 新增=>  "jira-dev-tool": "^1.7.61",
public\mockServiceWorker.js //新增的文件，用来启动xxx


//删掉package.json中的=>后面不会再用json-server了
"json-server": "json-server __json_server_mock__/db.json --watch --port 3001 --middlewares ./__json_server_mock__/middleware.js"



//其他怪异错误
npx msw init public

//jwt全称 => JSON WEB TOKENS 



    function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];

//它会根据传入的initialState的类型然后赋给泛型
```

## 第六章

```js
 //Ant Design4.x版本安装使用，并按需引入和自定义主题
//https://blog.csdn.net/Jie_1997/article/details/128032450

//安装指定版本antd
yarn add antd@4.9.4 


//import时，放在后面的import能覆盖前面的import；比如这里antd覆盖loadDevTools的样式
import { loadDevTools } from "jira-dev-tool";
import 'antd/dist/antd.less'

//安装craco
//yarn add @craco/craco@6.0.0

"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",
    
//替换成
    
"start": "craco start",
"build": "craco build",
"test": "craco test",
    
yarn add craco-less@1.17.1


//安装Emotion？===》》》一个css in js框架
yarn add @emotion/react@11.1.4
yarn add @emotion/styled@11.0.0



**使用emotion**
//例子1
{/* <HeaderItem as = {'div'}></HeaderItem> */}//通过这种方式将h3变为div
const HeaderItem = styled.h3`
  margin-right: 3rem;
`;

//React+TypeScript中使用Emotion
https://blog.csdn.net/qq_42565994/article/details/119699154


yarn add jira-dev-tool@next
```

## 第七章

### 7-1

```js
const obj = { name: 'jack', age: 8 }
//< Table  { ...obj }/>  等价于 <Table name= {'jack'} age = {8}/ >
//透传
```

### 7-2

```js
const [error, setError] = useState<Error | null>(null)//传入泛型

```

### 7-3

```
登录注册loading和错误处理  

当同步和异步混用时，我们捕获错误要用try...catch而不是error
```

## 第八章

### 8-1

```js
yarn add react-helmet
//会报错，因为这个库的类型声明文件与库是分离的
yarn add -D @types/react-helmet
03:00



```

### 8-3

```
yarn add react-router@6 react-router-dom@6
```

### 8-6

```
https://github.com/welldone-software/why-did-you-render
yarn add --dev @welldone-software/why-did-you-render
```

## 第九章

### 9-4

```jsx
import React from "react";
import "./styles.css";

export default function App() {
  const callbackRef = React.useRef(() => alert("init"));
  const callback = callbackRef.current;
  console.log(callback);
  return (
    <div className="App">
      <button onClick={() => (callbackRef.current = () => alert("updated"))}>
        setCallback
      </button>
      <button onClick={() => callback()}>callx</button>//init
      <button onClick={() => callbackRef.current()}>call callback</button>//updated
      <button onClick={callbackRef.current}>call1</button>//init
      <button onClick={callback}>call2</button>//init
   </div>
  );
}

```

## 第十章

### 10-10

```
yarn add react-rudux @ruduxjs/toolkit
```

## 第十一章

### 11-3

**类型守卫**

```js
const ErrorBox = ({error}:{error:unknown})=<{
    if(error.message){//这里报错
	}
}//无论以任何形式，你都不能在unknown上面读任何属性




const isError = (value: any): value is Error => value?.message;
//isError函数返回一个布尔值，该函数用于判断传入的参数value是否属于Error类型。
//在函数体内部，它使用了类型谓词（Type Predicate）value is Error，它表示如果函数返回true，TypeScript会把value的类型断言为Error类型。


const isObject = (value: any): value is Object =>  value?.abc       
console.log(isError( {abc:111}))
```

### 11-5

```
yarn remove jira-dev-tool && yarn add jira-dev-tool@next
```

## 第十二章

### 12-3

```
react-query好处:在2s中同时请求一个queryKey，会只发送一个请求
```

### 12-10

```
yarn add react-beautiful-dnd@13.0.0
yarn add @types/react-beautiful-dnd@13.0.0 -D
```



## 项目代码例子

```js
    const [user, setUser] = useState<User | null>(null);
	//const user:User | null
    const [user, setUser] = useState(null);、
    //user是null类型


JS 中的typeof，是在runtime时运行的
return typeof 1 === 'number'

// TS 中的typeof，是在静态环境运行的
// return (...[endpoint, config]: Parameters<typeof http>) =>
```



## 逻辑与&& AND 逻辑或||

**作用是对两个逻辑表达式进行比较，返回一个布尔值（true 或 false）。**

```js
**短路特性：**
	当使用 && 运算符时，如果第一个表达式为 false，那么第二个表达式不会被计算。
    当使用 || 运算符时，如果第一个表达式为 true，那么第二个表达式也不会被计算。这种特性可以提高代码的效率，避免不必要的计算。
    
**优先级：**
&& 运算符的优先级高于 || 运算符        
```



## 数组转二叉树

```js
class TreeNode {
  constructor(val, left, right) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function arrayToTree(arr, index) {
  if (index >= arr.length) {
    return null;
  }
  
  const root = new TreeNode(arr[index]);
  root.left = arrayToTree(arr, 2 * index + 1);
  root.right = arrayToTree(arr, 2 * index + 2);
  
  return root;
}


//验证1
const arr = [4,1,5,2,3];
const tree = arrayToTree(arr, 0);
console.log(tree);


{
    "val": 4,
    "left": {
        "val": 1,
        "left": {
            "val": 2,
            "left": null,
            "right": null
        },
        "right": {
            "val": 3,
            "left": null,
            "right": null
        }
    },
    "right": {
        "val": 5,
        "left": null,
        "right": null
    }
}
/****************************************************/

//[4,1,5,2,3]二叉树图像
            4
	1***************5
2*******3*****null*****null


//[4,1,5,2,3]二叉树索引
			0
	1***************2
3*******4*******5*******6

/****************************************************/

//验证2
const arr = [4,1,5,2,3];
const tree = arrayToTree(arr, 1);
console.log(tree);

{
    "val": 1,
    "left": {
        "val": 2,
        "left": null,
        "right": null
    },
    "right": {
        "val": 3,
        "left": null,
        "right": null
    }
}


```

## LeetCode 二叉树题目环境

```js
// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val);
  this.left = (left === undefined ? null : left);
  this.right = (right === undefined ? null : right);
}

/**
 * 构造一棵二叉树
 * @param {Array} arr - 二叉树的层序遍历数组
 * @returns {TreeNode} 构造完成的二叉树的根节点
 */
function buildTree(arr) {
  if (arr.length === 0) {
    return null;
  }
  const root = new TreeNode(arr[0]);
  const queue = [root];
  for (let i = 1; i < arr.length; i += 2) {
    const node = queue.shift();
    if (arr[i] !== null && arr[i] !== undefined) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    if (i + 1 < arr.length && arr[i + 1] !== null && arr[i + 1] !== undefined) {
      node.right = new TreeNode(arr[i + 1]);
      queue.push(node.right);
    }
  }
  return root;
}

/**
 * 将一棵二叉树转化为层序遍历的数组
 * @param {TreeNode} root - 二叉树的根节点
 * @returns {Array} 层序遍历的数组
 */
function serialize(root) {
  if (root === null) {
    return [];
  }
  const res = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node !== null) {
      res.push(node.val);
      queue.push(node.left);
      queue.push(node.right);
    } else {
      res.push(null);
    }
  }
  return res;
}

// test
const tree = buildTree([1, 2, 3, null, 4, 5, 6]);
console.log(serialize(tree));

```



# faceToWritingTs

> ​		**Ts归根到底就是一个类型的约束系统，你能把你的系统约束的越紧，出错的概率就越低。**

> ​        **写TS就是希望每一个变量和属性的类型都是固定的。想让类型固定有两种方式：类型推断和类型注解。能推断就推断，推断不出来的我们来告诉它。**

## 变量的声明

```js
var/let/const 标识符: 数据类型 = 赋值;
//声明了类型后TypeScript就会进行类型检测，声明的类型可以称之为类型注解（Type Annotation）；

/******number|boolean|Array|object|undefined|null******/
let num: number = 123//number类型
let flag: boolean = true//boolean类型
let message1: string = 'hello world'//string类型

**(1)Array类型**
// 明确的指定<数组>的类型注解: 两种写法
let name1: string[]= ["abc", "cba", "nba"]
let name2: Array<string> = ["abc", "cba", "nba"]
// 1. string[]: 数组类型, 并且数组中存放的字符串类型
// 2. Array<string>: 数组类型, 并且数组中存放的是字符串类型
//**另外Array<string>事实上是一种泛型的写法
//**注意事项: 在真实的开发中, 数组一般存放相同的类型, 不要存放不同的类型


**(2)object类型**
//object对象类型可以用于描述一个对象：
const myInfo: object = {
    name: "why",
    age: 18,
    height: 1.88
}
console.log(myInfo['name'])//报错信息如下:
myInfo.age = 123//报错信息如下:
//元素隐式具有“任何”类型，因为“名称”类型的表达式不能用于索引类型“{}”。
//**注意事项:从myinfo中我们不能获取数据，也不能设置数据：

//也可以这样声明对象类型
const info: {
  name: string
  age: number
} = {
  name: "why",
  age: 18
}


**(3)undefined&null&Symbol类型**
/*
在JavaScript中，undefined 和null是两个基本数据类型。
在TypeScript中，它们各自的类型也是undefined和null ，也就意味着它们既是实际的值，也是自己的类型:
*/
let n1: null = null//null类型
let n2: undefined = undefined//undefined类型


const title1 = Symbol("title")//Symbol类型
const title2 = Symbol('title')//Symbol类型
const info = {
  [title1]: "程序员",
  [title2]: "老师"
}


/*************any|unknown|void|never|tuple*************/
**1. any类型**
let id: any = "aaaa"
id = "bbbb"
//any类型就表示不限制标识符的任意类型, 
//**并且可以在该标识符上面进行任意的操作(在TypeScript中回到JavaScript中)
id = 123
console.log(id.length)



**2.unknown类型{与any类型比较学习}**
let foo: unknown = "aaa"
foo = 123

// unknown类型默认情况下在上面进行任意的操作都是非法的
// 要求必须进行类型的校验(缩小), 才能根据缩小之后的类型, 进行对应的操作
if (typeof foo === "string") { // 类型缩小
  console.log(foo.length, foo.split(" "))
}

**3.void类型**
//在TS中如果一个函数没有任何的返回值,或者返回值是undefined，那么返回值的类型就是void类型
function sum(num1: number, num2: number): void {
  console.log(num1 + num2)
  //return 123//错误的做法
}

const names = ["abc", "cba", "nba"]
// 了解即可: 基于上下文类型推导的函数中的返回值如果是void类型, 并且不强制要求不能返回任何的东西
names.forEach((item: string, index: number, arr: string[]) => {
  console.log(item)
  return 123
})

//new finding
type LyricInfoType = { time: number, text: string }
const lyricInfos1: LyricInfoType[] = []//ok
const lyricInfos2: LyricInfoType[] = [{time:1,text:'12'}]//ok
const lyricInfos3: LyricInfoType[] = [{}]//error

**4.never类型**
never表示永远不会发生值的类型，比如一个函数:
//1.如果一个函数中是一个死循环或者抛出一个异常，那么这个函数会返回东西吗
//2.不会，那么写void类型或者其他类型作为返回值类型都不合适，我们就可以使用never类型;

// 封装框架/工具库的时候可以使用一下never
// 其他时候在扩展工具的时候, 对于一些没有处理的case, 可以直接报错
function handleMessage(message: string | number | boolean) {
  switch (typeof message) {
    case "string":
      console.log(message.length)
      break
    case "number":
      console.log(message)
      break
    case "boolean":
      console.log(Number(message))
      break
    default:
      const check: never = message
  }
}

handleMessage("aaaa")
handleMessage(1234)

// 另外同事调用这个函数
handleMessage(true)


**5.tuple元组类型**
// 元组数据结构中可以存放不同的数据类型, 取出来的item也是有明确的类型
const info3: [string, number, number] = ["why", 18, 1.88]
const value2 = info3[2]

那么tuple和数组有什么区别呢?
	首先，数组中通常建议存放相同类型的元素，不同类型的元素是不推荐放在数组中。(可以放在对象或者元组中)
	其次，元组中每个元素都有自己特性的类型，根据索引值获取到的值可以确定对应的类型;

//数组类型
const info: (string | number)[]=[ "why",18,1.88]
const item1 = info[0]//不能确定类型
console.log(item1)

//**在函数中使用元组类型是最多的(函数的返回值)！！！！
function useState(initialState: number): [number, (newValue: number) => void] {
  let stateValue = initialState
  function setValue(newValue: number) {
    stateValue = newValue
  }

  return [stateValue, setValue]
}

const [count, setCount] = useState(10)
console.log(count)
setCount(100)


//使用ts-node运行ts:(还要安装ts-node和两个依赖包)
ts-node xxx.ts(文件名)
```



## 函数类型

> 在定义一个TypeScript中的函数时, 都要明确的指定参数的类型

> 和变量的类型注解一样，**我们通常情况下不需要返回类型注解**，因为TypeScript会根据return 返回值推断函数的返回类型



```js
// 在定义一个TypeScript中的函数时
// 返回值类型可以明确的指定, 也可以自动进行类型推导
function sum(num1: number, num2: number): number {
  return num1 + num2
}
const res = sum(123, 321)


//**匿名的参数类型
const names: string[] = ["abc", "cba", "nba"]
// 匿名函数是否需要添加类型注解呢? 最好不要添加类型注解
names.forEach(function(item, index, arr) {
  console.log(item, index, arr)
})


//当一个函数出现在TypeScript可以确定该函数会被如何调用的地方时;该函数的参数会自动指定类型;
const names =[ "abc" ,"cba" ,  "nba"]
names.forEach(item=>{
	console.log(item.toUpperCase())
})
/*
我们并没有指定item的类型，但是item是一个string类型:
这是因为TypeScript会根据forEach函数的类型以及数组的类型推断出item的类型;
这个过程称之为上下文类型(contextual typing)，因为函数执行的上下文可以帮助确定参数和返回值的类型;
*/

```



### 函数定义的方式

```js
//普通函数
function sum(num1: number, num2: number): number {
  return num1 + num2
}
const res = sum(123, 321)


// 箭头函数
const seeMeiMei = (time: number):void => {
  console.log(`我每天要看${time}个小时MeiMei`); 
}
seeMeiMei(8)


//函数表达式
let test1: (a: number, b: number) => number = function(a, b) {
	return a + b; // 返回数字
}

//{}也可写成object
let test2: (a: number, b: number) => {} = function(a, b) {
	return { a: 1 }; // 返回对象
}


// 接口函数 格式: (参数列表) => 返回值
type myFunc = (x: number, y: number) => number
const myfunc:myFunc = (a: number, b: number) => a + b
```

### 函数参数的处理

```js
//1.可选参数
const func1 =(a:number,b?:string):void =>{
 console.log('b可选')   
}
func1(12)// OK
func1(12,'asd')// OK
func1()// Error
//在调用时，a必传，b可传可不传，否则会报错

//2.默认值（在参数声明后使用 = xxx）
function f(a = 10):void{ // TypeScript 类型检查自动推断类型为"number"
}
f(12); // OK
f(); // OK
f('10');// Error


//3.剩余参数  ...args:any[]
function buildName(firstName: string, lastName: string = 'Cat', ...restOfName: string[]) {
    return firstName + ' ' + lastName;
}
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");

//剩余参数会被当作个数不限的可选参数，在函数定义的时候这样使用：
interface BuildNameFun {
  (firstName: string, ...rest: string[]): string
}

const buildNameFun: BuildNameFun = (firstName, ...restOfName) => {
  return firstName + " " + restOfName.join(" ");
}
```



## interface&type

**extend**

```
 
```

## 字面量类型

​		字面量类型（Literal Types）是 TypeScript 中一种特殊的类型，它可以用来指定变量或参数的值**只能是一个特定的字面量**。

​		字面量（Literal）是指在代码中**直接写出的具体的、明确的值**，而不是通过变量、函数或表达式计算得出的值。

```js
1.字符串字面量类型/数字字面量类型/布尔字面量类型
let str: "foo" | "bar" = "foo"; // 只能取 "foo" 或 "bar"

2.对象字面量类型
	对象字面量类型：使用对象字面量作为类型，表示变量或参数只能取特定的对象值。
    let obj: { x: number; y: string } = { x: 1, y: "hello" }; // 只能取 { x: number, y: string } 类型的对象

function setConfig(config: { debug: boolean; logLevel: "debug" | "info" | "error" }) {
  // ...
}
```



## 泛型

> ​		概念:一种特性的变量–类型变量(type variable)，它作用于类型，而不是值



```js
function useState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
//useState会根据传入值的类型赋值给泛型S
                                                    
 
                                                    
                                                    
const [params, setParams] = useState<{
  name: string;
  personId: string;
}>({
  name: '',
  personId: '',
});                                                    
//同上 
function foo<T>(param:T){
    console.log(param)
}


const abc = foo<string>('1')
```



## 类型断言

​		类型断言（Type Assertion）是一种在编程语言中指定变量或表达式的类型的方式。在某些编程语言中，类型断言可以强制将一个变量或表达式的类型转换为另一种类型，从而可以执行某些特定的操作或处理。

在 TypeScript 和 JavaScript 中，类型断言可以通过两种方式进行：

1. 尖括号语法：可以将一个变量或表达式强制转换为指定类型。例如：

```js
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

1. as 语法：同样可以将一个变量或表达式强制转换为指定类型。例如：

```js
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

​		需要注意的是，在 TypeScript 和 JavaScript 中，**类型断言不会在运行时检查类型**，因此如果进行了错误的类型断言，可能会导致程序运行时错误。因此，应该谨慎使用类型断言，并确保类型转换是正确的。



## 类型缩小

## 鸭子类型

TypeScript对于类型检测的时候使用的鸭子类型(理解)
鸭子类型: 如果一只鸟, 走起来像鸭子, 游起来像鸭子, 看起来像鸭子, 那么你可以认为它就是一只鸭子
**鸭子类型, 只关心属性和行为, 不关心你具体是不是对应的类型**

```js
interface Base {
  id: number
}

interface Advance extends Base {
  name: string
}

const test1 = (p: Base) => {
    console.log(p)//这里的p只需要具有id属性，且满足id属性的类型；**即使再多传其他的属性也不会报错**
}

const test2 = (p: Advance) => {
    console.log(p)//这里的需要具有id和name属性，且满足二者的类型；**即使再多传其他的属性也不会报错**
}

// 鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程
const a = {name:'s'}
const b = {id:1}
const c = {id:1,name:'2',other:3}

test1(a)//报错
test1(b)//ok
test1(c)//ok

test2(a)//报错
test2(b)//报错
test2(c)//ok
```



## 内置工具和类型体操

### Partial

**用于构造一个Type下面的所有属性都设置为可选的类型**

```js
type Person = {
    name: string;
    age: number;
};
const a: Partial<Person> = {name:'asd'}
const b: Partial<Person> = {name:'asd',age:213}
const c: Partial<Person> = {}
const d: Partial<Person> = {name:'asd',age:213,high:123}

```



## Ts怪异写法

```js
const foo =({obj}:{obj:Function})=>{
  console.log(obj)
}
foo({obj:()=>{
  console.log(2)
}})//ok
```



## other

**判断一个函数是否是Promise（Promise是一个构造函数）**

```
function isPromise(value) {
  return value && typeof value.then === 'function';
}
```

**当一个参数有默认值的时候，它就自动变成可选了（技巧）**

```js
( 
   { data, token, headers, ...customConfig }: Config = {}//当一个参数有默认值的时候，它就自动变成可选了（技巧）
)
//上面的说的是形参
funciton foo =()=>{
}
```



```js
let b: { [key: string]: unknown }//b是一个对象，可空可无限
b={}
b = {name: 'Jack'}
b={0:123}
b={0:321,1:23}

```

try...catch捕获异常注意事项

```js
const handleSubmit = async (values: { username: string; password: string }) => {
        // register(values).catch(onError)
        //或者
        try {
            await register(values)
        } catch (e) {
            onError(e)
        }
};
//两者等价
const handleSubmit =  (values: { username: string; password: string }) => {
        register(values).catch(onError) 
     	//catch会等异步执行完后调用
    };



const handleSubmit =  (values: { username: string; password: string }) => {
        try {
             register(values)
        } catch (e) {
            onError(e)
        }
};
//onError不会等register执行完才调用
```

### 闭包

**闭包指的是：能够访问另一个函数作用域中变量的函数。**
**清晰的讲：闭包就是一个函数，这个函数能够访问其他函数的作用域中的变量**



**常见闭包陷阱:**

```js
let f = ()=>{
      let func = []
      for(var i = 0; i < 3; i++){
          func.push(()=>{
              return i*i;
          })
      }
      return func 
  }
//等价于
let f = ()=>{
      let func = []
      var i
      for(i = 0; i < 3; i++){
          func.push(()=>{
              return i*i;
          })
      }
      return func
  }

/*
调用f()得到的是[f1,f2,f3]三个函数的数组
在func.push()这个函数中并没有变量i，因此直接去f()函数中取，当调用f1()|f2()|f3()时，此时f函数已经执行完毕，i已为3
*/


任何一对花括号({})中的语句集都属于一个块，在这之中定义的所有变量在代码块外都是不可见的，我们称之为块级作用域。



for(var i=0;i<6;i++){
    setTimeout(function(j){
        console.log(j);
    },i*1000,i);
}


//setTimeout的第三个参数是给第一个函数的参数，是先执行的
for(var i=0;i<6;i++){
    setTimeout(function(j){
        console.log(j);
    },i*1000,8);
}
```

### 异步

```js
/*
pending不会触发任何回调
resolve会触发then后面的回调
reject会触发catch后面的回调

then方法和catch方法只要没有报错返回的都是resolve状态的promise
*/

Promise.resolve().then(()=>{
console.log(1)// 1
throw new Error( 'erro1')
}).catch(()=> {
console.log(2) // 2
}).then(()=>{
console.log(3)//3
})//resolved

```



## useTsReactTip

```
https://www.yuque.com/iyum9i/uur0qi/wx1mor#xB0TM
```

### 组件化思想及常用名词

耦合：耦合度越低，两个或多个模块的依赖程度越低，独立性更好。

```js
	耦合（Coupling）指的是两个或多个模块之间相互依赖的程度。一个模块的变化是否会影响到另一个模块，取决于它们之间的耦合程度。
	当模块之间的耦合度较低时，它们的相互独立性就更高，这意味着更容易对它们进行修改、测试、维护和重构。相反，当模块之间的耦合度较高时，它们的相互依赖性就更强，这可能会导致修改一个模块时需要同时修改其他模块，从而增加了系统的复杂性和维护成本。
	常用的方法包括使用接口、抽象类、依赖注入、观察者模式等技术，来减少模块之间的直接依赖关系，从而降低耦合度。
```

**组件封装**

前端组件封装是一种常见的开发模式，其目的是将可重用的代码块组织成一个独立的、可定制的组件，并提供接口供其他开发人员使用。以下是几个前端组件封装思想中的重要概念：

```js
1. 单一职责原则（SRP）：这是指一个组件应该只负责一项功能，而不是多个功能的混合。这有助于组件的可维护性和可测试性，同时也有助于提高组件的重用性。
2. 开放封闭原则（OCP）：这是指一个组件应该对扩展开放，对修改关闭。这意味着我们应该通过组件的接口来扩展其功能，而不是直接修改组件的源代码。这有助于避免意外破坏组件的功能，并促进代码的可维护性。
3. 接口隔离原则（ISP）：这是指一个组件的接口应该只包含其客户端需要的方法和属性，而不应该暴露不必要的方法和属性。这有助于保持接口的简洁性和可读性，并提高组件的灵活性和可定制性。
4. 依赖倒置原则（DIP）：这是指一个组件应该依赖于抽象而不是具体实现。这意味着我们应该将组件的依赖项作为参数传递给组件，而不是在组件内部直接创建它们。这有助于减少组件之间的耦合，并提高组件的可测试性和可维护性。
```

## 组件卸载

```js
在React中，组件卸载指的是组件被从DOM中移除并销毁的过程。当一个组件不再被需要时，React会自动触发组件卸载过程，以便释放组件占用的资源，避免内存泄漏等问题。

组件卸载的过程中，React会依次执行以下生命周期方法：

componentWillUnmount()：在组件被卸载前调用，用于清理组件相关的资源，如取消网络请求、清除定时器等。
componentDidUnmount()：在组件被卸载后调用，用于执行一些清理操作，如释放组件占用的内存等。
需要注意的是，组件卸载后，其状态和属性将不再存在，因此在组件卸载之前应该将需要保存的状态和属性保存到父组件中，以便在需要时重新渲染组件。
```

## useCallback

```js
解决无限循环问题
涉及依赖要多留个心眼
```

### redux

```
可预测
reducer复合一个这样的特征，给他一个相同的state和相同的action，一定会返回一个相同的newState
```

## 在React项目中使用Ts

### React.FC

```tsx
const App: React.FC<{ message: string }> = ({ message }) => (
  <div>{message}</div>
);
//好处:

1.默认推断 children 属性：React.FC将 children 属性默认推断为 ReactNode 类型，允许接受任何类型的子元素。这使得在函数组件中直接使用和操作子元素变得更加方便。
2.自动推断 props 类型：React.FC通过泛型参数自动推断 props 的类型，不需要手动指定。这简化了组件定义时的类型注解，减少了冗余的代码。
```

