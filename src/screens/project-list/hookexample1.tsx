import React from "react";
import { SearchPanel } from "screens/project-list/search-panel";
import { List } from "screens/project-list/list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";




// 使用 JS 的同学，大部分的错误都是在 runtime(运行时) 的时候发现的
// 我们希望，在静态代码中，就能找到其中的一些错误 -> 强类型
const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);

  //下面两行后续被删掉了  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)//传入泛型


  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 200);
  const [list, setList] = useState([]);
  const client = useHttp();



  // Unhandled Rejection (TypeError): Failed to fetch
  //npm run json-server
  useEffect(() => {
    //请求开始时把loading设置为true
    setIsLoading(true)
    client("projects", { data: cleanObject(debouncedParam) })
      .then(setList)
      // .catch(setError)
      .catch(error => {
        setList([])
        setError(error)
      })
      .finally(() => setIsLoading(false))//请求结束时无论成功与失败都要调用

    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    // ).then(async (response) => {
    //   if (response.ok) {
    //     setList(await response.json());
    //   }// else {alert('error happen in response')}//这里会
    // })// .catch(() => alert('error happen'))//在fetch API,服务端返回的异常状态，后面跟catch这里并不会抛出异常;只有在断网，网络连接失败时这里才会抛出异常



    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam]);

  useMount(() => {
    client('users').then(setUsers)
    // fetch(`${apiUrl}/users`).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
      <List loading={isLoading} users={users} dataSource={list} />
    </Container>
  );
};


const Container = styled.div`
  padding: 3.2rem;
`;
