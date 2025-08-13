import { type Employee, type InsertEmployee, type ApiMetrics, type InsertApiMetrics } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getEmployee(id: string): Promise<Employee | undefined>;
  getEmployees(filters?: { search?: string; department?: string; status?: string }): Promise<Employee[]>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  updateEmployee(id: string, employee: Partial<InsertEmployee>): Promise<Employee | undefined>;
  deleteEmployee(id: string): Promise<boolean>;
  getApiMetrics(): Promise<ApiMetrics>;
  updateApiMetrics(metrics: Partial<InsertApiMetrics>): Promise<ApiMetrics>;
  simulateApiDelay(source: string): Promise<{ success: boolean; data?: any; error?: string }>;
}

export class MemStorage implements IStorage {
  private employees: Map<string, Employee>;
  private apiMetrics: ApiMetrics;

  constructor() {
    this.employees = new Map();
    this.apiMetrics = {
      id: randomUUID(),
      tti: "1.2s",
      previousTti: "2.1s", 
      improvement: "44%",
      apiSourcesCount: "3",
      searchSpeedMultiplier: "2x",
      wcagCompliant: true,
      lastUpdated: new Date(),
    };

    // Initialize with sample employees
    this.seedEmployees();
  }

  private seedEmployees() {
    const sampleEmployees: InsertEmployee[] = [
      {
        name: "Sarah Chen",
        title: "Senior Frontend Engineer",
        department: "Engineering",
        email: "sarah.chen@company.com",
        status: "active",
        skills: ["React", "TypeScript", "GraphQL"],
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
        bio: "Passionate about creating accessible and performant user interfaces.",
        location: "San Francisco, CA",
        apiSources: { twitter: "success", imdb: "success", wikipedia: "success" }
      },
      {
        name: "Marcus Rodriguez",
        title: "UX Designer",
        department: "Design",
        email: "marcus.rodriguez@company.com",
        status: "remote",
        skills: ["Figma", "Prototyping", "Research"],
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        bio: "Design thinking advocate with a focus on user-centered solutions.",
        location: "Austin, TX",
        apiSources: { twitter: "success", imdb: "error", wikipedia: "success" }
      },
      {
        name: "Emily Watson",
        title: "Product Manager",
        department: "Marketing",
        email: "emily.watson@company.com",
        status: "active",
        skills: ["Strategy", "Analytics", "Growth"],
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
        bio: "Data-driven product strategist with 8+ years of experience.",
        location: "New York, NY",
        apiSources: { twitter: "success", imdb: "success", wikipedia: "success" }
      },
      {
        name: "David Kim",
        title: "Backend Engineer",
        department: "Engineering",
        email: "david.kim@company.com",
        status: "offline",
        skills: ["Node.js", "Python", "Redis"],
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        bio: "Infrastructure specialist focused on scalable backend systems.",
        location: "Seattle, WA",
        apiSources: { twitter: "success", imdb: "success", wikipedia: "success" }
      },
      {
        name: "Lisa Zhang",
        title: "Data Scientist",
        department: "Engineering",
        email: "lisa.zhang@company.com",
        status: "active",
        skills: ["Python", "Machine Learning", "SQL"],
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        bio: "ML engineer building intelligent data pipelines.",
        location: "Boston, MA",
        apiSources: { twitter: "success", imdb: "success", wikipedia: "timeout" }
      },
      {
        name: "Alex Thompson",
        title: "DevOps Engineer",
        department: "Engineering",
        email: "alex.thompson@company.com",
        status: "remote",
        skills: ["Docker", "Kubernetes", "AWS"],
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        bio: "Cloud infrastructure expert with a passion for automation.",
        location: "Denver, CO",
        apiSources: { twitter: "error", imdb: "success", wikipedia: "success" }
      }
    ];

    sampleEmployees.forEach(emp => {
      const id = randomUUID();
      const employee: Employee = {
        ...emp,
        id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.employees.set(id, employee);
    });
  }

  async getEmployee(id: string): Promise<Employee | undefined> {
    return this.employees.get(id);
  }

  async getEmployees(filters?: { search?: string; department?: string; status?: string }): Promise<Employee[]> {
    let employees = Array.from(this.employees.values());

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      employees = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchLower) ||
        emp.title.toLowerCase().includes(searchLower) ||
        emp.department.toLowerCase().includes(searchLower) ||
        (Array.isArray(emp.skills) ? emp.skills : []).some((skill: string) => 
          skill.toLowerCase().includes(searchLower)
        )
      );
    }

    if (filters?.department) {
      employees = employees.filter(emp => emp.department.toLowerCase() === filters.department?.toLowerCase());
    }

    if (filters?.status) {
      employees = employees.filter(emp => emp.status === filters.status);
    }

    return employees;
  }

  async createEmployee(insertEmployee: InsertEmployee): Promise<Employee> {
    const id = randomUUID();
    const employee: Employee = {
      ...insertEmployee,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.employees.set(id, employee);
    return employee;
  }

  async updateEmployee(id: string, updateData: Partial<InsertEmployee>): Promise<Employee | undefined> {
    const employee = this.employees.get(id);
    if (!employee) return undefined;

    const updatedEmployee: Employee = {
      ...employee,
      ...updateData,
      updatedAt: new Date(),
    };
    this.employees.set(id, updatedEmployee);
    return updatedEmployee;
  }

  async deleteEmployee(id: string): Promise<boolean> {
    return this.employees.delete(id);
  }

  async getApiMetrics(): Promise<ApiMetrics> {
    return this.apiMetrics;
  }

  async updateApiMetrics(metrics: Partial<InsertApiMetrics>): Promise<ApiMetrics> {
    this.apiMetrics = {
      ...this.apiMetrics,
      ...metrics,
      lastUpdated: new Date(),
    };
    return this.apiMetrics;
  }

  async simulateApiDelay(source: string): Promise<{ success: boolean; data?: any; error?: string }> {
    // Simulate different API response times and success rates
    const delays = {
      twitter: { min: 200, max: 800, successRate: 0.95 },
      imdb: { min: 500, max: 1500, successRate: 0.85 },
      wikipedia: { min: 300, max: 1200, successRate: 0.90 }
    };

    const config = delays[source as keyof typeof delays] || delays.twitter;
    const delay = Math.random() * (config.max - config.min) + config.min;
    const isSuccess = Math.random() < config.successRate;

    await new Promise(resolve => setTimeout(resolve, delay));

    if (isSuccess) {
      return {
        success: true,
        data: {
          source,
          profile: `Mock ${source} profile data`,
          loadTime: `${Math.round(delay)}ms`
        }
      };
    } else {
      return {
        success: false,
        error: `${source} API temporarily unavailable`
      };
    }
  }
}

export const storage = new MemStorage();
