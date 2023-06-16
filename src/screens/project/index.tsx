import React from "react";
import { Link } from "react-router-dom";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "@emotion/styled";
import { Menu } from "antd";
import { useProjectIdInUrl } from "screens/kanban/util";

//以下皆是组件测试
import { PropsDetail } from 'code-readerjsx/props-detail'
import { ErrorBoundaryExample } from 'code-readerjsx/error-boundary'
import { GrandFather } from "code-readerjsx/ref-advanced1";//场景一:跨层级获取
import { Home } from 'code-readerjsx/ref-advanced2'//场景二:合并转发ref
import { HocHome } from 'code-readerjsx/ref-advanced3'//场景三：高阶组件转发
import { Index } from "code-readerjsx/ref-advanced4";//场景四：父组件调用子组件方法(ref通信){函数式组件的方式}
import { ProviderDemo } from 'code-readerjsx/context-advanced'//context高级用法=>逐层传递context
import InputTry from 'code-readerjsx/input-try'//input受控组件
import EditableShow from 'code-readerjsx/editable1'
import MyComponent from 'code-readerjsx/test'
import EditableUseExample1 from 'code-readertsx/editable-hooks-use1'
import EditableUseExample2 from 'code-readertsx/editable-hooks-use2'
import EditableUseExample3 from 'code-readertsx/editable-hooks-use3'
import EditableUseExample4 from 'code-readertsx/editable-hooks-use4'
import EditableUseExample5 from 'code-readertsx/editable-hooks-use5'
import VirtualSEx from 'code-readerjsx/virtualScroll'




const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  // console.log(window.location.pathname)
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        {/* <Link to={"/kanban"}>看板</Link> */}
        {/* 这种写法是错误的，加上/就是根路由了 */}
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
          <Menu.Item key={"propsDetail"}>
            <Link to={"propsDetail"}>props详解</Link>
          </Menu.Item>
          <Menu.Item key={"errorBoundaryExample"}>
            <Link to={"errorBoundaryExample"}>ErrorBoundary</Link>
          </Menu.Item>
          <Menu.Item key={"refAdvanced1"}>
            <Link to={"refAdvanced1"}>1.跨层级获取</Link>
          </Menu.Item>
          <Menu.Item key={"refAdvanced2"}>
            <Link to={"refAdvanced2"}>2.合并转发ref</Link>
          </Menu.Item>
          <Menu.Item key={"refAdvanced3"}>
            <Link to={"refAdvanced3"}>3.高阶组件转发</Link>
          </Menu.Item>
          <Menu.Item key={"refAdvanced4"}>
            <Link to={"refAdvanced4"}>4.父组件调用子组件方法(ref通信)</Link>
          </Menu.Item>
          <Menu.Item key={"contextAdvanced"}>
            <Link to={"contextAdvanced"}>context高级用法</Link>
          </Menu.Item>
          <Menu.Item key={"inputTry"}>
            <Link to={"inputTry"}>Input只能输入正整数</Link>
          </Menu.Item>
          <Menu.Item key={"EditableShow1"}>
            <Link to={"EditableShow1"}>EditableShow1</Link>
          </Menu.Item>

          <Menu.Item key={"EditableUse1"}>
            <Link to={"EditableUse1"}>EditableUse</Link>
          </Menu.Item>
          <Menu.Item key={"EditableUse2"}>
            <Link to={"EditableUse2"}>EditableUse</Link>
          </Menu.Item>
          <Menu.Item key={"EditableUse3"}>
            <Link to={"EditableUse3"}>EditableUse</Link>
          </Menu.Item>
          <Menu.Item key={"EditableUse4"}>
            <Link to={"EditableUse4"}>EditableUse</Link>
          </Menu.Item>
          <Menu.Item key={"EditableUse5"}>
            <Link to={"EditableUse5"}>EditableUse</Link>
          </Menu.Item>
          <Menu.Item key={"virtualSEx"}>
            <Link to={"virtualSEx"}>virtualSEx</Link>
          </Menu.Item>
          <Menu.Item key={"test"}>
            <Link to={"test"}>test</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          {/*projects/:projectId/kanban*/}
          <Route path={"/kanban"} element={<KanbanScreen />} />
          {/*projects/:projectId/epic*/}
          <Route path={"/epic"} element={<EpicScreen />} />
          <Route path={"/propsDetail"} element={<PropsDetail />} />
          <Route path={"/errorBoundaryExample"} element={<ErrorBoundaryExample />} />

          <Route path={"/refAdvanced1"} element={<GrandFather />} />
          <Route path={"/refAdvanced2"} element={<Home />} />
          <Route path={"/refAdvanced3"} element={<HocHome />} />
          <Route path={"/refAdvanced4"} element={<Index />} />
          <Route path={"/contextAdvanced"} element={<ProviderDemo />} />
          <Route path={"/inputTry"} element={<InputTry />} />
          <Route path={"/EditableShow1"} element={<EditableShow />} />
          <Route path={"/EditableUse1"} element={<EditableUseExample1 />} />
          <Route path={"/EditableUse2"} element={<EditableUseExample2 />} />
          <Route path={"/EditableUse3"} element={<EditableUseExample3 />} />
          <Route path={"/EditableUse4"} element={<EditableUseExample4 />} />
          <Route path={"/EditableUse5"} element={<EditableUseExample5 />} />
          <Route path={"/virtualSEx"} element={<VirtualSEx />} />



          <Route path={"/test"} element={<MyComponent />} />
          <Route path="*" element={<Navigate to={"/projects/" + useProjectIdInUrl() + "/kanban"} replace={true} />} />
          {/* <Navigate to={window.locat ion.pathname + "/kanban"} /> */}
        </Routes>
      </Main>

    </Container>
  );
};




const Aside = styled.aside`
  /* background-color: rgb(244, 245, 247); */
  display: flex;
  margin-top: 4px;
  overflow-y: auto;


  /* 滚动条轨道 */
::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* 轨道背景色 */
  border-radius: 5px; /* 设置滑块的圆角 */

}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background-color: #f1f1f1; /* 滑块背景色 */
  border-radius: 5px; /* 设置滑块的圆角 */

}

/* 滚动条边框 */
::-webkit-scrollbar {
  width: 8px; /* 滚动条宽度 */
  background-color: #f1f1f1; /* 滚动条背景色 */
  border-radius: 5px; /* 滚动条边角 */
}

/* 鼠标悬停时的滚动条滑块样式 */
::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* 悬停时滑块背景色 */
}

`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;//加了下面就有滚动条了
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 22rem 1fr;
  width: 100%;
  //overflow-y: auto; /* 添加纵向滚动条 */
`;
