import React, { useCallback } from "react";
import { useDocumentTitle } from "utils";
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "screens/kanban/util";
import { KanbanColumn } from "screens/kanban/kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "screens/kanban/search-panel";
import { useKanbans, useReorderKanban } from "utils/kanban";
import { ScreenContainer } from "components/lib";
import { useReorderTask, useTasks } from "utils/task";
import { Spin } from "antd";
import { CreateKanban } from "screens/kanban/create-kanban";
import { TaskModal } from "screens/kanban/task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/drag-and-drop";


export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();//改名为currentProject
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams());
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;

  // return (
  //   <ScreenContainer>
  //     <h1>{currentProject?.name}看板</h1>
  //     <SearchPanel />

  //     {isLoading ? (
  //       <Spin size={"large"} />
  //     ) : (
  //       <ColumnsContainer>
  //         {kanbans?.map((kanban) => (
  //           <KanbanColumn kanban={kanban} key={kanban.id} />
  //         ))}
  //         <CreateKanban />
  //       </ColumnsContainer>
  //     )}

  //     {/* <ColumnsContainer>
  //       {kanbans?.map((kanban) => (
  //         <KanbanColumn kanban={kanban} key={kanban.id} />
  //       ))}
  //     </ColumnsContainer> */}
  //   </ScreenContainer>
  // );
  const onDragEnd = useDragEnd();


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <ColumnsContainer>
            <Drop
              type={"COLUMN"}
              direction={"horizontal"}
              droppableId={"kanban"}
            >
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => (
                  <Drag
                    key={kanban.id}
                    draggableId={"kanban" + kanban.id}
                    index={index}
                  >
                    <KanbanColumn kanban={kanban} key={kanban.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnsContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};


export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  const { data: allTasks = [] } = useTasks(useTasksSearchParams());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        if (fromKanbanId === toKanbanId) {
          return;
        }
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  );
};





export const ColumnsContainer = styled('div')`
  display: flex;
  overflow-x: scroll;
  flex: 1;//去抢占剩余空间
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
