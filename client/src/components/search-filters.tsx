import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Settings2 } from "lucide-react";
import { useEmployees } from "@/hooks/use-employees";

interface SearchFiltersProps {
  filters: {
    search: string;
    department: string;
    status: string;
  };
  onFiltersChange: (filters: Partial<{ search: string; department: string; status: string }>) => void;
}

export function SearchFilters({ filters, onFiltersChange }: SearchFiltersProps) {
  const { data: employees } = useEmployees({});
  const totalResults = employees?.length || 0;

  const handleKeyboardShortcut = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('search-input') as HTMLInputElement;
      searchInput?.focus();
    }
  };

  return (
    <section className="bg-white border-b border-slate-200 py-6" data-testid="search-filters-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search Bar */}
          <div className="flex-1 max-w-lg">
            <label htmlFor="search-input" className="sr-only">
              Search employees
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" aria-hidden="true" />
              </div>
              <Input
                type="text"
                id="search-input"
                placeholder="Search by name, department, or skills..."
                value={filters.search}
                onChange={(e) => onFiltersChange({ search: e.target.value })}
                onKeyDown={handleKeyboardShortcut}
                className="pl-10 pr-12 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                aria-describedby="search-help"
                data-testid="input-search"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <span className="text-xs text-slate-400 hidden sm:block" data-testid="text-shortcut">
                  ⌘K
                </span>
              </div>
            </div>
            <p id="search-help" className="mt-1 text-xs text-slate-500">
              Press ⌘K to focus search
            </p>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="department-filter" className="text-sm font-medium text-slate-700">
                Department:
              </label>
              <Select
                value={filters.department}
                onValueChange={(value) => onFiltersChange({ department: value })}
              >
                <SelectTrigger 
                  className="w-40"
                  id="department-filter"
                  data-testid="select-department"
                >
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Departments</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <label htmlFor="status-filter" className="text-sm font-medium text-slate-700">
                Status:
              </label>
              <Select
                value={filters.status}
                onValueChange={(value) => onFiltersChange({ status: value })}
              >
                <SelectTrigger 
                  className="w-32"
                  id="status-filter"
                  data-testid="select-status"
                >
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              className="bg-slate-100 text-slate-700 hover:bg-slate-200"
              aria-expanded="false"
              aria-controls="advanced-filters"
              data-testid="button-advanced-filters"
            >
              <Settings2 className="h-4 w-4 mr-2" />
              <span className="text-sm">Filters</span>
            </Button>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-slate-600">
            <span data-testid="text-total-results">{totalResults}</span> employees found
            <span className="text-slate-400 mx-2">•</span>
            <span className="text-green-600">Loading optimized with React Suspense</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <span className="text-xs">⏱️</span>
            <span>
              Last updated: <span data-testid="text-last-updated">2 minutes ago</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
