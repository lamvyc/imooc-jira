import React from "react";
import { ErrorBoundary } from "components/error-boundary";

function MyComponent() {
    // throw new Error("oops!");
    /*
    通过使用错误边界，开发人员可以将错误限制在单个组件内部，从而防止它们影响整个应用程序。
    */
    return <div>Hello, world!</div>;
}

function MyFallback({ error }) {
    return <div>{error.toString()}</div>;
}

export function ErrorBoundaryExample() {
    return (
        <div>
            <h1>Hello, world!</h1>
            <ErrorBoundary fallbackRender={MyFallback}>
                <MyComponent />
            </ErrorBoundary>
        </div>
    );
}


// if (error) {
//     return fallbackRender({ error });
//   }
//   return children; ==> 对应return <MyComponent />
