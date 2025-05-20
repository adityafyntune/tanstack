import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';

const fetchApi = async () => {
  const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
  return data;
};

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
    cell: info => info.getValue(),
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
    cell: info => info.getValue(),
  }),
];

const NewQuery = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchApi,
  });

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <p className="text-gray-600">Loading...</p>;
  if (isError) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="p-4 bg-yellow-800">
      <h1 className="text-xl font-bold mb-4">Users Table</h1>
      <table className="min-w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-2 border border-gray-300 text-left font-medium text-gray-700"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-4 py-2 border border-gray-200 text-gray-800"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NewQuery;
