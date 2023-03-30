import React, { ProviderProps, ReactNode, useState } from "react";
import * as auth from "auth-provider";//auth包括里面导出的所有方法
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";


interface AuthForm {
    username: string;
    password: string;
}


//5-8 07:00介绍bootstraoUser函数  ---添加登录状态维持
//保持住登录状态
const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', { token })
        user = data.user
    }
    return user
}

/*
    function bar<T>(arg: T): T {
        return arg
    }
    const res1 = bar<number>(123)
    const res2 = bar<string>("abc")
    const res3 = bar<{ name: string }>({ name: "why" })
*/
//在函数调用时指定了传入类型而不是函数定义时指定的------
//创建一个名为AuthContext的context并约束传入的类型
const AuthContext = React.createContext<
    {
        user: User | null;
        register: (form: AuthForm) => Promise<void>;
        login: (form: AuthForm) => Promise<void>;
        logout: () => Promise<void>;
    }
    | undefined
>(undefined);
AuthContext.displayName = "AuthContext";



// interface Users {
//     id: string;
//     name: string;
//     email: string;
//     title: string;
//     organization: string;
//     token: string;
// }

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // const [user, setUser] = useState<User | null>(null);
    //7-4被替换成了
    const {
        data: user,
        error,
        isLoading,
        isIdle,
        isError,
        run,
        setData: setUser,
    } = useAsync<User | null>();


    // console.log(user)
    // point free
    const login = (form: AuthForm) => auth.login(form).then(setUser);
    //等价于
    // const login = (form: AuthForm) => auth.login(form).then((user) => setUser(user));

    const register = (form: AuthForm) => auth.register(form).then(setUser);
    const logout = () => auth.logout().then(() => setUser(null));


    useMount(() => {
        // bootstraoUser().then(setUser)
        run(bootstrapUser());
    })

    //展示一个大大的loading
    if (isIdle || isLoading) {
        return <FullPageLoading />;
    }


    //展示全局错误信息
    if (isError) {
        return <FullPageErrorFallback error={error} />;
    }




    return (
        <AuthContext.Provider
            children={children}
            value={{ user, login, register, logout }}

        // login, register, logout可以全局调用这三个方法，然后再随意读取user的信息
        />
    );
};

export const useAuth = () => {
    /*
    通过useContext拿到随便一个AuthContext.provider中value属性的值(达到一个全局变量的效果)
    const AuthContext = React.createContext()
    
    const App = ()=>{

        return (
            <AuthContext.provider 
                 value={a:1,b:2}
        >
            </AuthContext.provider>

        )
        
    }
    
    里面


    */
    const context = React.useContext(AuthContext);
    // console.log(context)
    /*
       {user: {…}, login: ƒ, register: ƒ, logout: ƒ}
    */



    if (!context) {
        throw new Error("useAuth必须在AuthProvider中使用");
    }
    return context;
};
