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
            cell: info => new Date(info.getValue<string>()).toISOString(),
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
        ].join(" ").toLowerCase();
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
    <div className="flex flex-col gap-4">

        <div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <span className="text-sm font-medium text-gray-700">Event type</span>
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
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                <span className="text-sm font-medium text-gray-700">Search</span>
                <input
                    type="text"
                    placeholder="Global Search..."
                    className="ml-4 rounded-md border border-gray-300 px-2 py-1 text-sm"
                    value={globalFilter ?? ""}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                />
            </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="max-h-130 overflow-auto">
                <table className="min-w-full border-collapse text-left text-sm">
                    <thead className="sticky top-0 z-10 bg-gray-50">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="border-b border-gray-200">
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className="px-4 py-3 font-semibold text-gray-900">
                            <button
                            key={header.id}
                            className="flex w-full items-center justify-between gap-2 text-left"
                            onClick={header.column.getToggleSortingHandler()}
                            >
                                <span>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                 </span>

                                <span className="text-xs text-gray-500">
                                    {{
                                    asc: "▲",
                                    desc: "▼",
                                    }[header.column.getIsSorted() as string] ?? ""}
                                </span>
                            </button>
                            </th>
                        ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody className="border border-gray-300">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} 
                        className={[
                            "border-b border-gray-100",
                            rowTone(row.original.eventType),
                            "hover:bg-gray-50/60",
                            ].join(" ")}
                        >
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="px-4 py-3 text-gray-800 border-l border-gray-200">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
}

export default ClickLogsTable;