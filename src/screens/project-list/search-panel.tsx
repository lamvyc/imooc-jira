import React from "react";
import { Form, Input, Select } from "antd";
import { Project } from "./list";
import { UserSelect } from "components/user-select";

//第一行，指定本文件的编译器



export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, 'name' | 'personId'>>;
  // param: {
  //   name: string;
  //   personId: string;
  // };
  setParam: (param: SearchPanelProps["param"]) => void;
}
/*负责人那一行*/
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    // 自带的行内样式style不支持比较高级的选择器
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      {/* layout={"inline"}=>让其水平着排 */}
      {/*setParam(Object.assign({}, param, {name:evt.target.value}))*/}
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>

    </Form>
  );
};





// <Form.Item>
//   <Select
//     value={param.personId}
//     onChange={(value) =>
//       setParam({
//         ...param,
//         personId: value,
//       })
//     }
//   >
//     <Select.Option value={""}>负责人</Select.Option>
//     {users.map((user) => (
//       <Select.Option key={user.id} value={String(user.id)}>{/*这种做法是不好的*/}
//         {user.name}
//       </Select.Option>
//     ))}
//   </Select>
// </Form.Item>