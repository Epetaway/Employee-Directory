import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "@/lib/api-client";
import { Employee } from "@shared/schema";

interface UseEmployeesOptions {
  search?: string;
  department?: string;
  status?: string;
}

export function useEmployees(options: UseEmployeesOptions = {}) {
  return useQuery<Employee[]>({
    queryKey: ['/api/employees', options.search, options.department, options.status],
    queryFn: () => fetchEmployees(options),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
