import React from "react";
import { Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";
import { BrowserRouter as Router } from "react-router-dom";




export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      {/* <Link to={"/kanban"}>看板</Link> */}
      {/* 这种写法是错误的，加上/就是根路由了 */}
      <Link to={"epic"}>任务组</Link>
      <Routes>
        {/*projects/:projectId/kanban*/}
        <Route path={"/kanban"} element={<KanbanScreen />} />
        {/*projects/:projectId/epic*/}
        <Route path={"/epic"} element={<EpicScreen />} />

        <Route path="*" element={<Navigate to={window.location.pathname + "/kanban"} replace={true} />} />
        {/* <Navigate to={window.location.pathname + "/kanban"} /> */}
      </Routes>
    </div>
  );
};