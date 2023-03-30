import React, { useState } from "react";
import { ProjectListScreen } from "screens/project-list";
import { useAuth } from "context/auth-context";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "components/lib";
import { Button, Dropdown, Menu } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";




/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

// export const AuthenticatedApp = () => {
//     const { logout } = useAuth();
//     return (
//         <Container>
//             <Header>
//                 <HeaderLeft>
//                     <h3>Logo</h3>
//                     <h3>项目</h3>
//                     <h3>用户</h3>
//                 </HeaderLeft>
//                 <HeaderRight>
//                     <button onClick={logout}>登出</button>
//                 </HeaderRight>
//             </Header>
//             <Nav>nav</Nav>
//             <Main>
//                 <ProjectListScreen />
//             </Main>
//             <Aside>aside</Aside>
//             <Footer>footer</Footer>
//         </Container>
//     );
// };

//已登录状态的APP界面
export const AuthenticatedApp = () => {
    const [projectModalOpen, setProjectModalOpen] = useState(false);

    return (
        <Container>
            <PageHeader
                projectButton={
                    <ButtonNoPadding
                        onClick={() => setProjectModalOpen(true)}
                        type={"link"}
                    >
                        创建项目
                    </ButtonNoPadding>
                }

            />
            <Main>
                <Router>
                    <Routes>
                        <Route path={"/projects"}
                            element={
                                <ProjectListScreen
                                    projectButton={
                                        <ButtonNoPadding
                                            onClick={() => setProjectModalOpen(true)}
                                            type={"link"}
                                        >
                                            创建项目
                                        </ButtonNoPadding>
                                    }
                                />
                            }
                        />
                        <Route
                            path={"/projects/:projectId/*"}//:代表后面跟的是一个变量
                            element={<ProjectScreen />}
                        />

                        {/* <Navigate to={"/projects"} /> */}
                        <Route path="*" element={<Navigate to="/projects" replace={true} />} />
                    </Routes>
                </Router>
            </Main>
            <ProjectModal
                projectModalOpen={projectModalOpen}
                onClose={() => setProjectModalOpen(false)}
            />
        </Container>
    );
};


const PageHeader = (props: { projectButton: JSX.Element }) => {
    return (
      <Header between={true}>
        <HeaderLeft gap={true}>
          <ButtonNoPadding type={"link"} onClick={resetRoute}>
            <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
          </ButtonNoPadding>
          <ProjectPopover {...props} />
          <span>用户</span>
        </HeaderLeft>
        <HeaderRight>
          <User />
        </HeaderRight>
      </Header>
    );
  };


const User = () => {
    const { logout, user } = useAuth();
    return (
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item key={"logout"}>
                        <Button onClick={logout} type={'link'}>登出</Button>
                        {/* <a onClick={logout}>登出</a> */}
                    </Menu.Item>
                </Menu>
            }
        >
            <Button type={'link'} onClick={(e) => e.preventDefault()}>Hi, {user?.name}</Button>
            {/* <a onClick={(e) => e.preventDefault()}>Hi, {user?.name}</a> */}
        </Dropdown>
    );
};


// eslint-disable-next-line no-lone-blocks
{/* <HeaderItem as = {'div'}></HeaderItem> */ }//通过这种方式将h3变为div

const HeaderItem = styled.h3`
  margin-right: 3rem;
`;

// temporal dead zone(暂时性死区)
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`; const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;




// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 6rem 1fr 6rem;
//   grid-template-columns: 20rem 1fr 20rem;
//   grid-template-areas:
//     "header header header"
//     "nav main aside"
//     "footer footer footer";
//   height: 100vh;
//   grid-gap: 10rem;
// `;

// // grid-area 用来给grid子元素起名字
// const Header = styled.header`
//   grid-area: header;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
// `;
// const HeaderLeft = styled.div`
//   display: flex;
//   align-items: center;
// `;
// const HeaderRight = styled.div``;
// const Main = styled.main`
//   grid-area: main;
// `;
// const Nav = styled.nav`
//   grid-area: nav;
// `;
// const Aside = styled.aside`
//   grid-area: aside;
// `;
// const Footer = styled.footer`
//   grid-area: footer;
// `;
