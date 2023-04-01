import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useCallback, useEffect } from "react";
import { cleanObject } from "utils/index";
import { useHttp } from "utils/http";
import { useMutation, useQuery, useQueryClient, QueryKey } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "utils/use-optimistic-options";



//11-3类型守卫
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // const { run, ...result } = useAsync<Project[]>();
  // // useEffect(() => {
  // //     run(client("projects", { data: cleanObject(param || {}) }));
  // //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // // }, [param]);  
  // const fetchProjects = useCallback(() =>
  //   client("projects", { data: cleanObject(param || {}) }),
  //   [param, client]
  // )
  // useEffect(() => {
  //   run(fetchProjects(), {
  //     retry: fetchProjects, 
  //   });
  // }, [param, run,fetchProjects]);


  //数组里面的东西变化里面的函数就会重新触发
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );
}



// const {run,isLoading,error,data:list} = useAsync<Project[]>()
// useEffect(() => {
//   run(client('projects',{data:cleanObject(debouncedParam)}))
//   //eslint-disable-next-line react-hooks/exhaustive-deps
// },[debouncedParam])


//版本1
// export const useEditProject = () => {
//   const { run, ...asyncResult } = useAsync();
//   const client = useHttp();
//   const mutate = (params: Partial<Project>) => {
//     return run(
//       client(`projects/${params.id}`, {
//         data: params,
//         method: "PATCH",
//       })
//     );
//   };
//   return {
//     mutate,
//     ...asyncResult,
//   };
// };

//版本2
// export const useEditProject = () => {
//   const client = useHttp();
//   const queryClient = useQueryClient();
//   return useMutation(
//     (params: Partial<Project>) =>
//       client(`projects/${params.id}`, {
//         method: "PATCH",
//         data: params,
//       }),
//     {
//       onSuccess: () => queryClient.invalidateQueries("projects"),
//     }
//   );
// };


export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useEditConfig(queryKey)
  );
};




// export const useAddProject = () => {
//   const { run, ...asyncResult } = useAsync();
//   const client = useHttp();
//   const mutate = (params: Partial<Project>) => {
//     return run(
//       client(`projects/${params.id}`, {
//         data: params,
//         method: "POST",
//       })
//     );
//   };
//   return {
//     mutate,
//     ...asyncResult,
//   };
// };


// export const useAddProject = () => {
//   const client = useHttp();
//   const queryClient = useQueryClient();

//   return useMutation(
//     (params: Partial<Project>) =>
//       client(`projects`, {
//         data: params,
//         method: "POST",
//       }),
//     {
//       onSuccess: () => queryClient.invalidateQueries("projects"),
//     }
//   );
// };




export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};



export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};



export const useProject = (id?: number) => {//这里id后面跟可选符时，id就变为number或者undefined了
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id),
    }//useQuery的第三个参数，只有当id有值时才触发更新，这样id为undefined时就不更了
  );
};

