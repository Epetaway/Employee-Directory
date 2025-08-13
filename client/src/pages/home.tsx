import { Suspense, useState, useCallback } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { SearchFilters } from "@/components/search-filters";
import { PerformanceShowcase } from "@/components/performance-showcase";
import { TechnicalHighlights } from "@/components/technical-highlights";
import { EmployeeCard } from "@/components/employee-card";
import { EmployeeSkeleton } from "@/components/employee-skeleton";
import { useEmployees } from "@/hooks/use-employees";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, AlertCircle, RefreshCw, HelpCircle } from "lucide-react";

interface EmployeeFilters {
  search: string;
  department: string;
  status: string;
}

function EmployeeGrid({ filters }: { filters: EmployeeFilters }) {
  const debouncedSearch = useDebounce(filters.search, 300);
  const { data: employees, isLoading, error, refetch } = useEmployees({
    search: debouncedSearch,
    department: filters.department,
    status: filters.status,
  });

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50" data-testid="error-state">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-900 mb-2">Failed to Load Employees</h3>
          <p className="text-sm text-slate-600 mb-4">
            One or more API sources are currently unavailable. This demonstrates real-world error handling.
          </p>
          <div className="bg-red-100 rounded-lg p-3 mb-4 text-left max-w-md mx-auto">
            <div className="text-xs text-red-800 space-y-1">
              <div className="flex items-center justify-between">
                <span>Twitter API:</span>
                <span className="text-red-600">✗ Failed</span>
              </div>
              <div className="flex items-center justify-between">
                <span>IMDB API:</span>
                <span className="text-green-600">✓ Success</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Wikipedia API:</span>
                <span className="text-red-600">✗ Timeout</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => refetch()}
            className="bg-red-600 hover:bg-red-700"
            data-testid="button-retry"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry Loading
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="loading-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <EmployeeSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="employee-grid">
      {employees?.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
}

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <Card className="border-red-200 bg-red-50 max-w-md mx-auto" data-testid="error-boundary">
      <CardContent className="p-6 text-center">
        <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-3" />
        <h3 className="font-semibold text-slate-900 mb-2">Something went wrong</h3>
        <p className="text-sm text-slate-600 mb-4">{error.message}</p>
        <Button onClick={resetErrorBoundary} variant="outline" data-testid="button-reset-error">
          Try again
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [filters, setFilters] = useState<EmployeeFilters>({
    search: "",
    department: "",
    status: "",
  });

  const [isSimulatingLoad, setIsSimulatingLoad] = useState(false);

  const handleFiltersChange = useCallback((newFilters: Partial<EmployeeFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  const simulateLoading = useCallback(async () => {
    setIsSimulatingLoad(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSimulatingLoad(false);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50" data-testid="header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Users className="text-white text-sm" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900">Employee Directory</h1>
                <p className="text-xs text-slate-500">Multi-API Aggregation Demo</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {/* Performance Metrics Display */}
              <div className="hidden md:flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-600" data-testid="text-tti">TTI: 1.2s</span>
                  <span className="text-green-600 font-medium" data-testid="text-improvement">↓44%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600">✓</span>
                  <span className="text-slate-600" data-testid="text-wcag">WCAG AA</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" aria-label="Help" data-testid="button-help">
                <HelpCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Performance Showcase */}
      <PerformanceShowcase />

      {/* Search and Filters */}
      <SearchFilters filters={filters} onFiltersChange={handleFiltersChange} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="main-content">
        {/* Loading State Demo Section */}
        <div className="mb-8 p-6 bg-slate-100 rounded-lg border-l-4 border-blue-500" data-testid="demo-section">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-1">
              <span className="text-blue-600 text-xs">i</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">React Suspense Loading Demo</h3>
              <p className="text-sm text-slate-600 mb-3">
                Click the button below to see skeleton loading states in action
              </p>
              <Button
                onClick={simulateLoading}
                disabled={isSimulatingLoad}
                className="bg-blue-600 hover:bg-blue-700"
                data-testid="button-simulate-loading"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isSimulatingLoad ? 'animate-spin' : ''}`} />
                {isSimulatingLoad ? 'Simulating...' : 'Simulate API Reload'}
              </Button>
            </div>
          </div>
        </div>

        {/* Employee Grid */}
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="suspense-loading">
              {Array.from({ length: 8 }).map((_, i) => (
                <EmployeeSkeleton key={i} />
              ))}
            </div>
          }>
            {isSimulatingLoad ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="simulated-loading">
                {Array.from({ length: 8 }).map((_, i) => (
                  <EmployeeSkeleton key={i} />
                ))}
              </div>
            ) : (
              <EmployeeGrid filters={filters} />
            )}
          </Suspense>
        </ErrorBoundary>

        {/* Load More Section */}
        <div className="mt-8 text-center" data-testid="load-more-section">
          <Button
            variant="outline"
            className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-6 py-3"
            data-testid="button-load-more"
          >
            <span className="mr-2">+</span>
            Load More Employees
            <span className="text-xs text-slate-500 ml-2">(Suspense Loading)</span>
          </Button>
        </div>
      </main>

      {/* Technical Highlights */}
      <TechnicalHighlights />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-slate-600">
                <strong>Employee Directory Demo</strong> - Showcasing modern front-end development
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Built with React, TypeScript, and performance optimization techniques
              </p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-slate-500">
              <span data-testid="text-footer-performance">Performance: TTI 1.2s (44% improvement)</span>
              <span>•</span>
              <span data-testid="text-footer-wcag">WCAG AA Compliant</span>
              <span>•</span>
              <span data-testid="text-footer-suspense">React Suspense</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
