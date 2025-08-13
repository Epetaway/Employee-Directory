import { apiRequest } from "./queryClient";

export async function fetchEmployees(filters?: { 
  search?: string; 
  department?: string; 
  status?: string; 
}) {
  const params = new URLSearchParams();
  
  if (filters?.search) params.append('search', filters.search);
  if (filters?.department) params.append('department', filters.department);
  if (filters?.status) params.append('status', filters.status);
  
  const url = `/api/employees${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await apiRequest('GET', url);
  return await response.json();
}

export async function fetchEmployee(id: string) {
  const response = await apiRequest('GET', `/api/employees/${id}`);
  return await response.json();
}

export async function createEmployee(employee: any) {
  const response = await apiRequest('POST', '/api/employees', employee);
  return await response.json();
}

export async function updateEmployee(id: string, employee: any) {
  const response = await apiRequest('PATCH', `/api/employees/${id}`, employee);
  return await response.json();
}

export async function deleteEmployee(id: string) {
  await apiRequest('DELETE', `/api/employees/${id}`);
}

export async function fetchApiMetrics() {
  const response = await apiRequest('GET', '/api/metrics');
  return await response.json();
}

export async function simulateLoading(sources?: string[]) {
  const response = await apiRequest('POST', '/api/simulate-loading', { sources });
  return await response.json();
}

export async function simulateError(errorType?: string) {
  const response = await apiRequest('POST', '/api/simulate-error', { errorType });
  return await response.json();
}
