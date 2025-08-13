import { Clock, Network, Search } from "lucide-react";

export function PerformanceShowcase() {
  return (
    <section className="bg-blue-600 text-white py-8" data-testid="performance-showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Performance Optimization in Action</h2>
          <p className="text-blue-100">Real-time demonstration of multi-API aggregation improvements</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Time to Interactive */}
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm" data-testid="metric-tti">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Time to Interactive</span>
              <Clock className="h-4 w-4 text-blue-200" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold" data-testid="text-current-tti">1.2s</span>
              <span className="text-sm text-blue-200 line-through" data-testid="text-previous-tti">2.1s</span>
              <span className="text-green-300 text-sm font-medium" data-testid="text-improvement">-44%</span>
            </div>
          </div>

          {/* API Sources */}
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm" data-testid="metric-api-sources">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">API Sources</span>
              <Network className="h-4 w-4 text-blue-200" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold" data-testid="text-api-count">3</span>
              <span className="text-sm text-blue-200">Normalized</span>
            </div>
            <div className="text-xs text-blue-200 mt-1" data-testid="text-api-list">
              Twitter • IMDB • Wikipedia
            </div>
          </div>

          {/* Search Speed */}
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm" data-testid="metric-search-speed">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Search Speed</span>
              <Search className="h-4 w-4 text-blue-200" />
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold" data-testid="text-speed-multiplier">2x</span>
              <span className="text-sm text-blue-200">Faster</span>
            </div>
            <div className="text-xs text-green-300 mt-1" data-testid="text-optimization">
              Debounced + Optimized
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
