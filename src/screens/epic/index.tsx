import React, { useState } from "react";
import { Row, ScreenContainer } from "components/lib";
import { useProjectInUrl } from "screens/kanban/util";
import { useDeleteEpic, useEpics } from "utils/epic";
import { Button, List, Modal } from "antd";
import dayjs from "dayjs";
import { useTasks } from "utils/task";
import { Link } from "react-router-dom";
import { useEpicSearchParams, useEpicsQueryKey } from "screens/epic/util";
import { Epic } from "types/epic";
import { CreateEpic } from "screens/epic/create-epic";
import styled from "@emotion/styled";

export const EpicScreen = () => {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组：${epic.name}`,
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };

  return (
    <ScreenContainerMain>
      <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button onClick={() => setEpicCreateOpen(true)} type={"link"}>
          创建任务组
        </Button>
      </Row>
      <List
        // style={{ overflow: "scroll" }}
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button onClick={() => confirmDeleteEpic(epic)} type={"link"}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                .map((task) => (
                  <Link
                    to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </ScreenContainerMain>
  );
};



const ScreenContainerMain = styled.div`
  padding-top: 1.2rem;
  padding-left: 1.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
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
  height: 10px;
  background-color: #f1f1f1; /* 滚动条背景色 */
  border-radius: 5px; /* 滚动条边角 */
}

/* 鼠标悬停时的滚动条滑块样式 */
::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* 悬停时滑块背景色 */
}
`;