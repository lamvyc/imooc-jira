import React from "react";
import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "screens/project-list/util";


export const ProjectPopover = () => {
  const { open } = useProjectModal();
  const { data: projects, refetch } = useProjects();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => {
          // console.log(project)
          return (<List.Item key={project.id}>
            <List.Item.Meta title={project.name}  />
          </List.Item>
          )
        })}
      </List>
      <Divider />
      <ButtonNoPadding
        onClick={open}
        type={"link"}
      >
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;



/*
上述圆括号是为了能让React能够正确地解析JSX语法
可以用下面两种方法代替圆括号
{pinnedProjects?.map((project) =>
  <React.Fragment key={project.id}>
    <List.Item>
      <List.Item.Meta title={project.name} />
    </List.Item>
  </React.Fragment>
)}

{pinnedProjects?.map((project) =>
  <>
    <List.Item>
      <List.Item.Meta title={project.name} />
    </List.Item>
  </>
)}


*/