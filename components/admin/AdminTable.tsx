'use client'

import { useState } from 'react'
import { ChevronUp, ChevronDown, Search, Filter, Download } from 'lucide-react'

interface Column {
  key: string
  label: string
  sortable?: boolean
  render?: (value: any, row: any) => React.ReactNode
}

interface AdminTableProps {
  columns: Column[]
  data: any[]
  title?: string
  searchable?: boolean
  filterable?: boolean
  exportable?: boolean
  onRowClick?: (row: any) => void
  actions?: React.ReactNode
}

export default function AdminTable({
  columns,
  data,
  title,
  searchable = true,
  filterable = true,
  exportable = true,
  onRowClick,
  actions
}: AdminTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(columnKey)
      setSortDirection('asc')
    }
  }

  const filteredData = data.filter(row =>
    searchTerm === '' || 
    Object.values(row).some(value => 
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0
    
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)

  return (
    <div className="bg-white border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          {title && (
            <h2 className="text-xl font-bold font-mono text-black mb-1">
              {title}
            </h2>
          )}
          <p className="text-sm text-gray-600">
            Showing {paginatedData.length} of {sortedData.length} results
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border-3 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all text-sm"
              />
            </div>
          )}
          
          {filterable && (
            <button className="bg-gray-200 hover:bg-gray-100 text-black font-bold py-2 px-3 text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-1">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          )}
          
          {exportable && (
            <button className="bg-gray-200 hover:bg-gray-100 text-black font-bold py-2 px-3 text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex items-center gap-1">
              <Download className="w-4 h-4" />
              Export
            </button>
          )}
          
          {actions}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-3 border-black">
          <thead>
            <tr className="bg-gray-100 border-b-3 border-black">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-4 py-3 text-left font-bold text-black border-r-3 border-black last:border-r-0 ${
                    column.sortable ? 'cursor-pointer hover:bg-gray-200' : ''
                  }`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <div className="flex flex-col">
                        <ChevronUp 
                          className={`w-3 h-3 ${
                            sortColumn === column.key && sortDirection === 'asc' 
                              ? 'text-[#13b6ec]' 
                              : 'text-gray-400'
                          }`} 
                        />
                        <ChevronDown 
                          className={`w-3 h-3 -mt-1 ${
                            sortColumn === column.key && sortDirection === 'desc' 
                              ? 'text-[#13b6ec]' 
                              : 'text-gray-400'
                          }`} 
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr
                key={index}
                className={`border-b-2 border-gray-200 hover:bg-gray-50 ${
                  onRowClick ? 'cursor-pointer' : ''
                }`}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 border-r-2 border-gray-200 last:border-r-0">
                    {column.render 
                      ? column.render(row[column.key], row)
                      : row[column.key]
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="bg-gray-200 hover:bg-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed text-black font-bold py-2 px-3 text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              Previous
            </button>
            
            <span className="px-3 py-2 text-sm font-bold">
              {currentPage} / {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="bg-gray-200 hover:bg-gray-100 disabled:bg-gray-100 disabled:cursor-not-allowed text-black font-bold py-2 px-3 text-sm border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}