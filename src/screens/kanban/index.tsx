import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbanSearchParams, useProjectInUrl } from "screens/kanban/util";
import { KanbanColumn } from "screens/kanban/kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "screens/kanban/search-panel";
import { useKanbans } from "utils/kanban";
import { ScreenContainer } from "components/lib";



export const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();//改名为currentProject
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  console.log(kanbans)
  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;//去抢占剩余空间
`;
