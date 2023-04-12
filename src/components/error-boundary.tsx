import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

// https://github.com/bvaughn/react-error-boundary
export class ErrorBoundary extends React.Component<React.PropsWithChildren<{ fallbackRender: FallbackRender }>, { error: Error | null }> {
  /*
  React.PropsWithChildren的作用是将一个 React 组件的 props 类型 P 转换为包含 children 属性的类型。
  children 属性是 React 组件特有的属性，它代表组件的子节点。
  在上面的例子中，使用 React.PropsWithChildren 将 FallbackRender 类型转换为包含 children 属性的类型，这样组件就可以接受任意的子节点作为 children 属性了。
  */


  state = { error: null };
  // 当子组件抛出异常，这里会接收到并且调用
  //它是在组件渲染过程中出现错误时被调用的静态方法（static method）。
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  /*
    在面向对象编程中，静态方法（static method）是指属于类（class）本身而不是实例（instance）的方法。
    静态方法可以直接通过类名调用，不需要先创建类的实例。
    静态方法不能访问类的实例变量或实例方法，因为它们不属于实例，只属于类本身。它们只能访问静态变量或静态方法，
    或者类的其他静态属性


    ErrorBoundary.getDerivedStateFromError()可以直接这样拿到
  */




  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}



// import React, { Component, ErrorInfo } from "react";
// type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
// class ErrorBoundary extends Component<{ fallbackRender: FallbackRender }, { error: Error | null }> {
//   state = { error: null };
//   static getDerivedStateFromError(error: Error) {
//     return { error };
//   }
//   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
//     console.error("Uncaught error:", error, errorInfo);
//   }
//   render() {
//     const { fallbackRender, children } = this.props;
//     const { error } = this.state;
//     if (error) {
//       return fallbackRender({ error });
//     } else {
//       return children;
//     }
//   }
// }

// export default ErrorBoundary;
