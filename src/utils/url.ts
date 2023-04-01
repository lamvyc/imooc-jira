import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo,useState } from "react";
import { cleanObject, subset } from "utils/index";

/**
 * 返回页面url中，指定键的参数值
 */
// export const useUrlQueryParam = <K extends string>(keys: K[]) => {//示例参数["name", "personId"]
//   const [searchParams, setSearchParam] = useSearchParams();
//   return [
//     useMemo(
//       () =>
//         subset(Object.fromEntries(searchParams), keys) as {
//           [key in K]: string;
//         },
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//       [searchParams]
//     ),
//     (params: Partial<{ [key in K]: unknown }>) => {
//       // iterator
//       // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
//       const o = cleanObject({
//         ...Object.fromEntries(searchParams),
//         ...params,
//       }) as URLSearchParamsInit;
//       return setSearchParam(o);
//     },
//   ] as const
// };

/*
这段代码中的 as const 出现在返回值类型的声明中，它的作用是将返回值的类型从普通的元组类型变成一个只读的元组类型。
    在这种情况下，使用 as const 可以确保返回值中的对象成为一个只读的对象，防止它被意外地修改。这在实际开发中非常有用，
因为只读的对象更安全，可以更好地保护代码的正确性。
    如果不加 as const
    比如说，在返回值类型为普通的元组类型时，第一个值可能会被 TypeScript 推断为一个可变的对象类型，
因为 TypeScript 并不知道这个对象中的属性是不可变的。这会导致这个对象可以被意外地修改，而 TypeScript 不会报错。
    另外，如果返回值类型为普通的元组类型，那么第二个值的类型可能也会被推断为一个可变的函数类型，这个函数可能会修改外部变量，
而 TypeScript 也不会发出任何警告。
*/




// import { useSearchParams } from "react-router-dom";
// import { useMemo } from "react";

// //只有泛型能允许我们暂时先不指定具体的类型，根据传入的值来动态判断类型
// export const useUrlQueryParam = <K extends string>(keys: K[]) => {
//   const [searchParams, setSearchParam] = useSearchParams();
//   return [

//     useMemo(
//       () => keys.reduce((prev: { [p: string]: string }, key: string) => {
//         // console.log(prev)
//         return { ...prev, [key]: searchParams.get(key) || '' }
//       }, {} as { [key in string]: string }),
//       // eslint-disable-next-line react-hooks/exhaustive-deps
//       [searchParams]
//     ),
//     setSearchParam
//   ] as const
// }



/**
 * 返回页面url中，指定键的参数值
 */
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), stateKeys) as {
          [key in K]: string;
        },
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParams(params);
      // iterator
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
    },
  ] as const;
};

//单独抽离解决地址栏中url=>点击创建项目--关闭弹窗，地址栏url展示错误的问题
export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};




