import { Card, CardContent } from "@/components/ui/card";

export function EmployeeSkeleton() {
  return (
    <Card className="bg-white animate-pulse" data-testid="skeleton-employee-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-slate-200 rounded-full" data-testid="skeleton-avatar"></div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-slate-200 rounded-full" data-testid="skeleton-status-dot"></div>
            <div className="w-12 h-3 bg-slate-200 rounded" data-testid="skeleton-status-text"></div>
          </div>
        </div>

        <div className="mb-4">
          <div className="w-32 h-4 bg-slate-200 rounded mb-2" data-testid="skeleton-name"></div>
          <div className="w-24 h-3 bg-slate-200 rounded mb-2" data-testid="skeleton-title"></div>
          <div className="w-20 h-3 bg-slate-200 rounded" data-testid="skeleton-department"></div>
        </div>

        {/* API Loading Status */}
        <div className="mb-4">
          <div className="w-20 h-3 bg-slate-200 rounded mb-2" data-testid="skeleton-api-label"></div>
          <div className="flex space-x-2">
            <div className="w-6 h-6 bg-slate-200 rounded" data-testid="skeleton-api-1"></div>
            <div className="w-6 h-6 bg-slate-200 rounded" data-testid="skeleton-api-2"></div>
            <div className="w-6 h-6 bg-slate-200 rounded" data-testid="skeleton-api-3"></div>
          </div>
        </div>

        {/* Skills Loading */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            <div className="w-12 h-5 bg-slate-200 rounded-full" data-testid="skeleton-skill-1"></div>
            <div className="w-16 h-5 bg-slate-200 rounded-full" data-testid="skeleton-skill-2"></div>
            <div className="w-14 h-5 bg-slate-200 rounded-full" data-testid="skeleton-skill-3"></div>
          </div>
        </div>

        {/* Action Buttons Loading */}
        <div className="flex space-x-2">
          <div className="flex-1 h-8 bg-slate-200 rounded-md" data-testid="skeleton-message-button"></div>
          <div className="w-8 h-8 bg-slate-200 rounded-md" data-testid="skeleton-profile-button"></div>
        </div>
      </CardContent>
    </Card>
  );
}
