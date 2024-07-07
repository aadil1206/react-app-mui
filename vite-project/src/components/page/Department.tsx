import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import MinimizeIcon from "@mui/icons-material/Minimize";
interface subDepartment {
  title: string;
  state: Boolean;
  id: number;
}
interface StateItem {
  state: boolean;
}
interface Department {
  department: { title: string; state: Boolean; id: number };
  sub_departments: subDepartment[];
}
function Department() {
  const departmentData: Department[] = [
    {
      department: { title: "customer_service", state: false, id: 1 },
      sub_departments: [
        { title: "support", state: false, id: 11 },
        { title: "customer_success", state: false, id: 12 },
      ],
    },
    {
      department: { title: "design", state: false, id: 2 },
      sub_departments: [
        { title: "graphic_design", state: false, id: 21 },
        { title: "product_design", state: false, id: 22 },
        { title: "web_design", state: false, id: 23 },
      ],
    },
  ];
  const [open, setopen] = useState<StateItem[]>([
    { state: false },
    {
      state: false,
    },
  ]);
  const [DepartmentsData, SetDepartmentsdata] =
    useState<Department[]>(departmentData);

  const handleParentChange = (ID: number) => {
    SetDepartmentsdata(
      DepartmentsData.map((item: Department) => {
        if (item.department.id == ID && item.department.state === false) {
          let subDepartmentUpdate = item.sub_departments.map(
            (subItem: subDepartment) => {
              return {
                ...subItem,
                state: true,
              };
            }
          );
          return {
            sub_departments: subDepartmentUpdate,
            department: {
              ...item.department,
              state: true,
            },
          };
        } else if (item.department.id == ID && item.department.state === true) {
          let subDepartmentUpdatess = item.sub_departments.map(
            (subItem: subDepartment) => {
              return {
                ...subItem,
                state: false,
              };
            }
          );
          return {
            sub_departments: subDepartmentUpdatess,
            department: {
              ...item.department,
              state: false,
            },
          };
        } else {
          return item;
        }
      })
    );
  };

  const handleChildChange = async (subID: number) => {
    await SetDepartmentsdata(
      DepartmentsData.map((item: Department,) => {
        let UpdSub = item.sub_departments.map((subitem: subDepartment) => {
          if (subitem.id === subID) {
            return {
              ...subitem,
              state: !subitem.state,
            };
          } else {
            return subitem;
          }
        });

        let everyTrue = UpdSub.every((evertrue) => {
          return evertrue.state === true;
        });

        return {
          department: {
            ...item.department,
            state: everyTrue,
          },
          sub_departments: UpdSub,
        };
      })
    );
  };
  const handleExpand = (index: number) => {
    setopen(
      open.map((item: StateItem, id: number) => {
        if (id === index) {
          return {
            ...item,
            state: !item.state,
          };
        } else {
          return item;
        }
      })
    );
   
  };
  return (
    <div className="App">
      {DepartmentsData.map((item: Department, index: number) => (
        <FormGroup key={index}>
          <div style={{ display: "flex" }}>
            <MinimizeIcon onClick={() => handleExpand(index)}></MinimizeIcon>
            <FormControlLabel
              label={item.department.title}
              control={
                <Checkbox
                  checked={!!item.department.state}
                  onChange={() => handleParentChange(item.department.id)}
                />
              }
            />
          </div>

          {open[index].state &&
            item.sub_departments.map((sub: subDepartment,) => (
              <FormControlLabel
                // key={index}
                style={{ marginLeft: "20px" }}
                label={sub.title}
                control={
                  <Checkbox
                    checked={!!sub.state}
                    onChange={() => handleChildChange(sub.id,)}
                  />
                }
              />
            ))}
        </FormGroup>
      ))}
    </div>
  );
}

export default Department;
