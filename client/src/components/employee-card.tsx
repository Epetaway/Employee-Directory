import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Employee } from "@shared/schema";
import { Mail, User, CheckCircle, XCircle, Clock } from "lucide-react";

interface EmployeeCardProps {
  employee: Employee;
}

function ApiSourceIcon({ source, status }: { source: string; status: string }) {
  const getIcon = () => {
    switch (source) {
      case "twitter":
        return "𝕏";
      case "imdb":
        return "🎬";
      case "wikipedia":
        return "W";
      default:
        return "?";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-600";
      case "error":
        return "bg-red-100 text-red-600";
      case "timeout":
        return "bg-yellow-100 text-yellow-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-3 w-3" />;
      case "error":
        return <XCircle className="h-3 w-3" />;
      case "timeout":
        return <Clock className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={`w-6 h-6 rounded flex items-center justify-center text-xs font-medium ${getStatusColor()}`}
      title={`${source} Profile ${status}`}
      data-testid={`api-source-${source}`}
    >
      {status === "success" ? getIcon() : getStatusIcon()}
    </div>
  );
}

function StatusIndicator({ status }: { status: string }) {
  const getStatusConfig = () => {
    switch (status) {
      case "active":
        return { color: "bg-green-500", label: "Active" };
      case "remote":
        return { color: "bg-yellow-500", label: "Remote" };
      case "offline":
        return { color: "bg-gray-400", label: "Offline" };
      default:
        return { color: "bg-gray-400", label: "Unknown" };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 ${config.color} rounded-full`} title={config.label}></div>
      <span className="text-xs text-slate-500" data-testid={`status-${status}`}>{config.label}</span>
    </div>
  );
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const apiSources = employee.apiSources as Record<string, string> || {};
  const skills = Array.isArray(employee.skills) ? employee.skills : [];

  const handleSendMessage = () => {
    // Placeholder for message functionality
    console.log(`Sending message to ${employee.name}`);
  };

  const handleViewProfile = () => {
    // Placeholder for profile view functionality
    console.log(`Viewing profile for ${employee.name}`);
  };

  return (
    <Card 
      className="bg-white hover:shadow-md transition-shadow duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      tabIndex={0}
      role="button"
      aria-label={`View ${employee.name}'s profile`}
      data-testid={`card-employee-${employee.id}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleViewProfile();
        }
      }}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <img
            src={employee.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}`}
            alt={employee.name}
            className="w-12 h-12 rounded-full object-cover"
            data-testid={`img-avatar-${employee.id}`}
          />
          <StatusIndicator status={employee.status} />
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-slate-900 mb-1" data-testid={`text-name-${employee.id}`}>
            {employee.name}
          </h3>
          <p className="text-sm text-slate-600 mb-2" data-testid={`text-title-${employee.id}`}>
            {employee.title}
          </p>
          <p className="text-xs text-slate-500" data-testid={`text-department-${employee.id}`}>
            {employee.department}
          </p>
        </div>

        {/* API Integration Status */}
        <div className="mb-4">
          <div className="flex items-center space-x-1 mb-2">
            <span className="text-xs font-medium text-slate-700">API Sources:</span>
          </div>
          <div className="flex space-x-2" data-testid={`api-sources-${employee.id}`}>
            {Object.entries(apiSources).map(([source, status]) => (
              <ApiSourceIcon key={source} source={source} status={status} />
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1" data-testid={`skills-${employee.id}`}>
            {skills.slice(0, 3).map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs"
                data-testid={`badge-skill-${index}`}
              >
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{skills.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Contact Actions */}
        <div className="flex space-x-2">
          <Button
            size="sm"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={(e) => {
              e.stopPropagation();
              handleSendMessage();
            }}
            aria-label={`Send message to ${employee.name}`}
            data-testid={`button-message-${employee.id}`}
          >
            <Mail className="h-3 w-3 mr-1" />
            Message
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-slate-100 hover:bg-slate-200"
            onClick={(e) => {
              e.stopPropagation();
              handleViewProfile();
            }}
            aria-label={`View ${employee.name}'s full profile`}
            data-testid={`button-profile-${employee.id}`}
          >
            <User className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
