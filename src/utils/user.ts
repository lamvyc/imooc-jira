// import { User } from "screens/project-list/search-panel";
// import { useHttp } from "utils/http";
// import { useAsync } from "utils/use-async";
// import { useEffect } from "react";
// import { cleanObject } from "utils/index";

// export const useUsers = (param?: Partial<User>) => {
//     const client = useHttp();
//     const { run, ...result } = useAsync<User[]>();
//     console.log(result)
// /*
// {
//     "isIdle": false,
//     "isLoading": false,
//     "isError": false,
//     "isSuccess": true,
//     "data": [
//         {
//             "organization": "外卖组",
//             "ownerId": 2087569429,
//             "name": "高修文",
//             "id": 13
//         },
//         {
//             "organization": "外卖组",
//             "ownerId": 2087569429,
//             "name": "熊天成",
//             "id": 14
//         },
//         {
//             "organization": "总部组",
//             "ownerId": 2087569429,
//             "name": "郑华",
//             "id": 15
//         },
//         {
//             "organization": "中台组",
//             "ownerId": 2087569429,
//             "name": "王文静",
//             "id": 16
//         }
//     ],
//     "stat": "success",
//     "error": null
// }
// */


//     useEffect(() => {
//         run(client("users", { data: cleanObject(param || {}) }));
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [param]);

//     return result;
// };


//   // const [users, setUsers] = useState([]);
//   // useMount(() => {
//   //   client('users').then(setUsers)
//   // });



import { useHttp } from "utils/http";
import { User } from "types/user";
import { useQuery } from "react-query";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  return useQuery<User[]>(["users", param], () =>
    client("users", { data: param })
  );
};
