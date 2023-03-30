import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "utils";



interface State<D> {
    error: Error | null;
    data: D | null;
    stat: 'idle' | 'loading' | 'error' | 'success';//字面量类型，声明了四个状态
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null,
}

const defaultConfig = {
    throwOnError: false,
};


const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
    const mountedRef = useMountedRef();
    return useCallback(
        (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
        [dispatch, mountedRef]
    );
};





export const useAsync = <D>(
    initialState?: State<D>,
    initialConfig?: typeof defaultConfig
) => {
    const config = { ...defaultConfig, ...initialConfig };
    const [state, dispatch] = useReducer(
        (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
        {
            ...defaultInitialState,
            ...initialState,
        }

    )
    const safeDispatch = useSafeDispatch(dispatch);




    // useState直接传入函数的含义是：惰性初始化；所以，要用useState保存函数，不能直接传入函数
    // https://codesandbox.io/s/blissful-water-230u4?file=/src/App.js
    const [retry, setRetry] = useState(() => () => { });

    const setData = useCallback((data: D) =>
        safeDispatch({
            data,
            stat: 'success',
            error: null,
        }),
        [safeDispatch]
    )

    const setError = useCallback((error: Error) =>
        safeDispatch({
            error,
            stat: 'error',
            data: null,
        }),
        [safeDispatch]
    )

    //run用来触发异步请求
    const run = useCallback(
        (
            promise: Promise<D>,
            runConfig?: { retry: () => Promise<D> }
        ) => {
            if (!promise || !promise.then) {//没有promise或者啥也不传
                // console.log(promise)
                throw new Error('请传入 Promise 类型数据')
            }
            setRetry(() => () => {
                if (runConfig?.retry) {
                    run(runConfig?.retry(), runConfig);
                }
            });
            // setState(prevState => ({ ...prevState, stat: 'loading' }))//当请求开始时把状态设置为loading
            // setState(  { ...state, stat: 'loading' })//当请求开始时把状态设置为loading
            safeDispatch({ stat: "loading" });
            return promise
                .then(data => {
                    // if (mountedRef.current) //如果if中要执行的语句只有一条，可以省略花括号。如果执行的语句超过一条，就不能省略了
                    setData(data)
                    return data
                })
                .catch((error) => {
                    // catch会消化异常，如果不主动抛出，外面是接收不到异常的
                    setError(error);
                    // return error;
                    if (config.throwOnError) return Promise.reject(error)
                    return error
                });
        },
        // [config.throwOnError, mountedRef, setData, state, setError]//是state造成了无限循环问题
        // [config.throwOnError, mountedRef, setData, setError]//是state造成了无限循环问题
        [config.throwOnError, setData, setError, safeDispatch]

    )

    return {
        isIdle: state.stat === "idle",
        isLoading: state.stat === "loading",
        isError: state.stat === "error",
        isSuccess: state.stat === "success",
        run,
        setData,
        setError,
        // retry 被调用时重新跑一遍run，让state刷新一遍
        retry,
        ...state,//error从state中抛出
    };

} 