import React from "react";
import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "../../utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import {
  useProjectModal,
  useProjectsSearchParams
} from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";

// 状态提升可以让组件共享状态，但是容易造成 prop drilling


// 使用 JS 的同学，大部分的错误都是在 runtime(运行时) 的时候发现的
// 我们希望，在静态代码中，就能找到其中的一些错误 -> 强类型

export const ProjectListScreen = () => {
  // 8-6被替换了
  // const [param, setParam] = useState({
  //   name: "",
  //   personId: "",
  // });



  useDocumentTitle("项目列表", false);
  // 基本类型，可以放到依赖里；组件状态{比如上面的state-param}，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
  // https://codesandbox.io/s/keen-wave-tlz9s?file=/src/App.js
  // const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // const projectsParam = { ...param, personId: Number(param.personId) || undefined }//解构覆盖
  // const debouncedParam = useDebounce(projectsParam, 200);
  // const client = useHttp();//返回http(endpoint, { ...config, token: user?.token });
  //返回data给它另起一个名字叫list
  // const { run, isLoading, error, data: list } = useAsync<Project[]>()
  // const { isLoading, error, data: list } = useProjects(debouncedParam);//获取list和error以及loading
  // const { data: users } = useUsers();//获取users



  const { open } = useProjectModal();

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();



  /************************************************************************************************************/
  // const [users, setUsers] = useState([]);
  // const [param, setParam] = useState({
  //   name: "",
  //   personId: "",
  // });
  // const debouncedParam = useDebounce(param, 200);
  // const client = useHttp();//返回http(endpoint, { ...config, token: user?.token });

  // const {run,isLoading,error,data:list} = useAsync<Project[]>()
  // useEffect(() => {
  //   run(client('projects',{data:cleanObject(debouncedParam)}))
  //   //eslint-disable-next-line react-hooks/exhaustive-deps
  // },[debouncedParam])

  // useMount(() => {
  //   client('users').then(setUsers)
  // });
  /************************************************************************************************************/

  // console.log(useUrlQueryParam(['name']))

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />

      {/* {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null} */}
      <List
        loading={isLoading}
        users={users || []}
        dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

//类组件这样写
// class Test extends React.Component<any,any>{
//   static whyDidYouRender = true
// }


const Container = styled.div`
  padding: 3.2rem;
`;
