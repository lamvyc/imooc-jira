import React from "react";
import { Link } from "react-router-dom";
import { Navigate, Route, Routes, useLocation } from "react-router";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";
import { BrowserRouter as Router } from "react-router-dom";
import styled from "@emotion/styled";
import { Menu } from "antd";
//以下皆是组件测试
import { PropsDetail } from 'code-readerjsx/props-detail'
import {ErrorBoundaryExample} from 'code-readerjsx/error-boundary'
import { GrandFather } from "code-readerjsx/ref-advanced1";//场景一:跨层级获取
import {Home} from 'code-readerjsx/ref-advanced2'//场景二:合并转发ref
import {HocHome} from 'code-readerjsx/ref-advanced3'//场景三：高阶组件转发
import { Index } from "code-readerjsx/ref-advanced4";


import { CodeReadingTsx } from "code-readertsx";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  console.log(window.location.pathname)
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

          <Route path="*" element={<Navigate to={window.location.pathname + "/kanban"} replace={true} />} />
          {/* <Navigate to={window.location.pathname + "/kanban"} /> */}
        </Routes>
      </Main>

    </Container>
  );
};




const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;//加了下面就有滚动条了

`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
  /* overflow: hidden; */
`;
