import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { useCallback } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
    token?: string;
    data?: object;
}
//mark由于RequestInit并不包含token与data的类型，故另外声明一种类型继承RequestInit，并把token与data添加进去{extend使用 场景}



export const http = async (
    //`${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`   =》里面的projects
    endpoint: string,
    { data, token, headers, ...customConfig }: Config = {}//当一个参数有默认值的时候，它就自动变成可选了，你就可以选择传入这个参数或者不传（技巧）
) => {
    //配置
    const config = {
        method: "GET",
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": data ? "application/json" : "",
        },
        ...customConfig,
    };//mark虽然里面写明了为GET请求，但customerConfig里面如果有method属性仍然可以覆盖里面的GET方法




    if (config.method.toUpperCase() === "GET") {//转为大写
        endpoint += `?${qs.stringify(data)}`;
    } else {
        config.body = JSON.stringify(data || {});
    }

    // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
    return window
        .fetch(`${apiUrl}/${endpoint}`, config)
        .then(async (response) => {
            if (response.status === 401) {
                await auth.logout();
                window.location.reload();//页面刷新
                return Promise.reject({ message: "请重新登录" });
            }
            const data = await response.json();
            if (response.ok) {
                return data;
            } else {
                return Promise.reject(data);
            }
        });
};


// JS 中的typeof，是在runtime时运行的
// return typeof 1 === 'number'

// TS 中的typeof，是在静态环境运行的
// return (...[endpoint, config]: Parameters<typeof http>) =>{}
//这里的TS中的typeof是拿到http函数的形参里面的类型并传过去

export const useHttp = () => {
    const { user } = useAuth();
    // utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
    return useCallback(
        (...[endpoint, config]: Parameters<typeof http>) =>{
        /*
        //mark这里为什么解构呢？
        因为不解构调用时
        const client =useHttp()
        client([endpoint,config])得这样传参

        */
        
        // console.log(endpoint,config)
       return  http(endpoint, { ...config, token: user?.token });
    },
    [user?.token])
};

// type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;


















// 类型别名、Utility Type 讲解
// 联合类型
let myFavoriteNumber: string | number;
myFavoriteNumber = "seven";
myFavoriteNumber = 7;
// myFavoriteNumber = {}      // TS2322: Type '{}' is not assignable to type 'string | number'.

let jackFavoriteNumber: string | number;

// 类型别名在很多情况下可以和interface互换
// interface Person {
//   name: string
// }
// type Person = { name: string }
// const xiaoMing: Person = {name: 'xiaoming'}

// 类型别名, interface 在这种情况下没法替代type
type FavoriteNumber = string | number;
let roseFavoriteNumber: FavoriteNumber = "6";

// interface 也没法实现Utility type
type Person = {
    name: string;
    age: number;
};

//Partial<Person>令所有属性变为可选
const xiaoMing: Partial<Person> = {};//5-9  11：00
const shenMiRen: Omit<Person, "name" | "age"> = {};
type PersonKeys = keyof Person;
type PersonOnlyName = Pick<Person, "name" | "age">;
type Age = Exclude<PersonKeys, "name">;

// Partial 的实现
type Partial<T> = {
    [P in keyof T]?: T[P];//这里?是可选的意思
};