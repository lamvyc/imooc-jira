import { useUrlQueryParam } from "utils/url";
import { useMemo } from "react";
import { useProject } from "utils/project";
import { useSearchParams } from "react-router-dom";


// 项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  console.log(param.personId)
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};



//扮演着全局状态管理器的作用
// export const useProjectModal = () => {
//   const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
//     "projectCreate",
//   ]);

//   const open = () => setProjectCreate({ projectCreate: true });
//   // const close = () => setProjectCreate({ projectCreate: false });//改为undefined不会被转为字符串，想要一个空的效果
//   const close = () => setProjectCreate({ projectCreate: undefined });

//   return {
//     projectModalOpen: projectCreate === "true",
//     open,
//     close,
//   };
// };


export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);
  const [_, setUrlParams] = useSearchParams();
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const open = () => setProjectCreate({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};