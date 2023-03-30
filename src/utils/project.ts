import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { useCallback, useEffect } from "react";
import { cleanObject } from "utils/index";
import { useHttp } from "utils/http";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  console.log(client, 'client--------------------------------------')
  const { run, ...result } = useAsync<Project[]>();

  // useEffect(() => {
  //     run(client("projects", { data: cleanObject(param || {}) }));
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [param]);

  const fetchProjects = useCallback(() =>
    client("projects", { data: cleanObject(param || {}) }),
    [param, client]
  )

  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [param, run,fetchProjects]);
  return result;
}



// const {run,isLoading,error,data:list} = useAsync<Project[]>()
// useEffect(() => {
//   run(client('projects',{data:cleanObject(debouncedParam)}))
//   //eslint-disable-next-line react-hooks/exhaustive-deps
// },[debouncedParam])


export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};


export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
