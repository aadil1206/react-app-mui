import { useEffect, useState } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Data {
  id: number;
  userId: number;
  title: string;
  body: string;
}
const DataApi = () => {
  const [data, setdata] = useState<Data[]>([]);
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
    
      await setdata(response.data);
    } catch (error) {
      console.log(error, "error");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const rows = data.map((row: Data) => ({
    id: row.id,
    userId: row.userId,
    title: row.title,
    body: row.body,
  }));
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "userId",
      headerName: "User ID",
      width: 150,
      editable: true,
    },
    {
      field: "title",
      headerName: "Title",
      width: 150,
      editable: true,
    },
    {
      field: "body",
      headerName: "Body",

      width: 110,
      editable: true,
    },
  ];
  return (
    <div>
      {data.length !== null && (
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      )}
    </div>
  );
};

export default DataApi;
