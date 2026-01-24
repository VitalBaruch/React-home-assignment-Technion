import React, { useState } from "react";
import { EVENT, type ClickLog, type EventType } from "../experiment/flow";
import type { ColumnDef, SortingState, ColumnFiltersState, FilterFn, Row } from "@tanstack/react-table";
import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel, getFilteredRowModel } from "@tanstack/react-table";

type ClickRowLog = ClickLog & {
    id : string;
}


const rowTone = (eventType: EventType) => {
    switch (eventType) {
        case EVENT.LIKERT_CLICK:
            return "bg-blue-50";
        case EVENT.RANDOM_WORD_CLICK:
            return "bg-green-50";
        case EVENT.SUBMIT:
            return "bg-yellow-50";
        default:
            return "";
    }
}

const ClickLogsTable = (props: { clickLogs: Array<ClickLog> }) => {
    const [sorting, setSorting] = useState<SortingState>([
        { id: 'timestamp', desc: true }
    ]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
        {
            id: 'eventType', value: EVENT.LIKERT_CLICK
        }
    ]);
    const [globalFilter, setGlobalFilter] = useState<string>("");

    const data: ClickRowLog[] = React.useMemo(() => {
        return props.clickLogs.map((log, index) => ({
            ...log,
            id: `log-${index}`,
        }));
    }, [props.clickLogs]);

    const columns = React.useMemo((): ColumnDef<ClickRowLog>[] => [
        {
            header: 'Event Type',
            accessorKey: 'eventType',
            cell: info => info.getValue<EventType>(),
        },
        {
            header: 'Event',
            accessorKey: 'event',
            cell: info => info.getValue<string>(),
        },
        {
            id : 'timestamp',
            header: 'Timestamp UTC',
            accessorKey: 'timestamp',
            cell: info => new Date(info.getValue<number>()).toISOString(),
        },
    ], []);

    const globalSearch: FilterFn<ClickRowLog> = (row: Row<ClickRowLog>, _columnId: string, filterValue: string) => {
        const search = (filterValue ?? "").toLowerCase().trim();
        if (search === "") {
            return true;
        }
        const rowStack = [
            row.original.event,
            new Date(row.original.timestamp).toISOString(),
            row.original.eventType,
        ].join(" ").toLocaleLowerCase();
        return rowStack.includes(search);
    }

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            globalFilter,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: globalSearch,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    });

  return (
    <div>
        <label className="text-sm text-gray-600">Filter by type:</label>
        <select
            className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm"
            value={(table.getColumn("eventType")?.getFilterValue() as string) ?? ""}
            onChange={(e) => table.getColumn("eventType")?.setFilterValue(e.target.value)}
        >
            <option value="">All</option>
            <option value={EVENT.LIKERT_CLICK}>LIKERT_CLICK</option>
            <option value={EVENT.RANDOM_WORD_CLICK}>RANDOM_WORD_CLICK</option>
            <option value={EVENT.SUBMIT}>SUBMIT</option>
        </select>
        <input
            type="text"
            placeholder="Global Search..."
            className="ml-4 rounded-md border border-gray-300 px-2 py-1 text-sm"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
        />
        <table className="min-w-full border-collapse border border-gray-300 text-center">
            <thead className="bg-gray-200">
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="border border-gray-300">
                {headerGroup.headers.map(header => (
                    <th key={header.id} className="border border-gray-300">
                    <button
                    key={header.id}
                    className="border border-gray-300 p-2 w-full"
                    onClick={header.column.getToggleSortingHandler()}
                    >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                            asc: ' 🔼',
                            desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null}
                    </button>
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody className="border border-gray-300">
            {table.getRowModel().rows.map(row => (
                <tr key={row.id} className={`border border-gray-300 ${rowTone(row.original.eventType)}`}>
                {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="border border-gray-300 p-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
    </div>
  );
}

export default ClickLogsTable;