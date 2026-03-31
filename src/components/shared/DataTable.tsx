import { ReactNode } from "react";

interface Column<T> { key: string; label: string; render?: (item: T) => ReactNode; }

interface Props<T> { columns: Column<T>[]; data: T[]; onRowClick?: (item: T) => void; loading?: boolean; }

export default function DataTable<T extends { id: string }>({ columns, data, onRowClick, loading }: Props<T>) {
  if (loading) return <div className="bg-white rounded-xl border border-surface-200 p-12 text-center text-gray-400">Loading...</div>;
  return (
    <div className="bg-white rounded-xl border border-surface-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-200 bg-surface-50">
              {columns.map(col => (
                <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-100">
            {data.length === 0 ? (
              <tr><td colSpan={columns.length} className="px-4 py-12 text-center text-gray-400">No data found</td></tr>
            ) : data.map(item => (
              <tr key={item.id} onClick={() => onRowClick?.(item)}
                className={onRowClick ? "cursor-pointer hover:bg-surface-50 transition-colors" : ""}>
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-3 text-sm text-gray-700">
                    {col.render ? col.render(item) : (item as any)[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
