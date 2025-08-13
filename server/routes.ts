import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmployeeSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all employees with optional filtering
  app.get("/api/employees", async (req, res) => {
    try {
      const { search, department, status } = req.query;
      const filters = {
        search: search as string,
        department: department as string,
        status: status as string,
      };

      // Simulate network delay for demonstration
      await new Promise(resolve => setTimeout(resolve, 300));

      const employees = await storage.getEmployees(filters);
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch employees" });
    }
  });

  // Get single employee
  app.get("/api/employees/:id", async (req, res) => {
    try {
      const employee = await storage.getEmployee(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch employee" });
    }
  });

  // Create new employee
  app.post("/api/employees", async (req, res) => {
    try {
      const validatedData = insertEmployeeSchema.parse(req.body);
      const employee = await storage.createEmployee(validatedData);
      res.status(201).json(employee);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid employee data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create employee" });
    }
  });

  // Update employee
  app.patch("/api/employees/:id", async (req, res) => {
    try {
      const partialData = insertEmployeeSchema.partial().parse(req.body);
      const employee = await storage.updateEmployee(req.params.id, partialData);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid employee data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update employee" });
    }
  });

  // Delete employee
  app.delete("/api/employees/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteEmployee(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete employee" });
    }
  });

  // Get API performance metrics
  app.get("/api/metrics", async (req, res) => {
    try {
      const metrics = await storage.getApiMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch metrics" });
    }
  });

  // Simulate multi-API data aggregation
  app.post("/api/simulate-loading", async (req, res) => {
    try {
      const { sources = ["twitter", "imdb", "wikipedia"] } = req.body;
      
      // Simulate parallel API calls
      const apiPromises = sources.map((source: string) => storage.simulateApiDelay(source));
      const results = await Promise.allSettled(apiPromises);
      
      const aggregatedData = results.map((result, index) => ({
        source: sources[index],
        status: result.status === "fulfilled" && result.value.success ? "success" : "error",
        data: result.status === "fulfilled" ? result.value.data : null,
        error: result.status === "fulfilled" ? result.value.error : "Promise rejected"
      }));

      res.json({
        aggregatedData,
        totalTime: "1.2s",
        improvement: "44%",
        successRate: aggregatedData.filter(r => r.status === "success").length / aggregatedData.length
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to simulate API aggregation" });
    }
  });

  // Simulate error states for demonstration
  app.post("/api/simulate-error", async (req, res) => {
    const { errorType = "network" } = req.body;
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    switch (errorType) {
      case "network":
        res.status(503).json({ 
          message: "Network timeout - One or more API sources are unavailable",
          details: {
            twitter: "success",
            imdb: "timeout",
            wikipedia: "error"
          }
        });
        break;
      case "rate_limit":
        res.status(429).json({ 
          message: "Rate limit exceeded - Please try again in a few minutes",
          retryAfter: 60
        });
        break;
      default:
        res.status(500).json({ message: "Unknown error occurred" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
