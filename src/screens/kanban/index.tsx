import React from "react";
import { useDocumentTitle } from "utils";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "screens/kanban/util";
import { KanbanColumn } from "screens/kanban/kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "screens/kanban/search-panel";
import { useKanbans } from "utils/kanban";
import { ScreenContainer } from "components/lib";
import { useTasks } from "utils/task";
import { Spin } from "antd";
import { CreateKanban } from "screens/kanban/create-kanban";


export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();//改名为currentProject
  // console.log(currentProject)
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(useKanbanSearchParams());
  // console.log(kanbans)
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />

      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnsContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))}
          <CreateKanban />
        </ColumnsContainer>
      )}

      {/* <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer> */}
    </ScreenContainer>
  );
};

export const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;//去抢占剩余空间
`;
