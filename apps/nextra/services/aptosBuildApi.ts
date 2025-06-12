import { User } from "firebase/auth";
import { createAdminApiClient } from "@aptos-internal/api-gateway-admin-api-client";

interface RSPCError {
  code: number;
  message: string;
}

export interface Organization {
  id: string;
  name: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
}

export interface Application {
  id: string;
  name: string;
  network: string;
  description: string;
  service_type: string;
}

export interface ApiKey {
  id: string;
  name: string;
  keySecret: string;
}

class ClientContext {
  private client: ReturnType<typeof createAdminApiClient>;
  private headers: Record<string, string> = {};

  constructor(user: User, baseUrl: string) {
    this.client = createAdminApiClient({
      apiUrl: baseUrl,
      customFetch: async (input: RequestInfo | URL, init?: RequestInit) => {
        const token = await user.getIdToken();
        return fetch(input, {
          ...init,
          headers: {
            ...init?.headers,
            Authorization: `Bearer ${token}`,
            ...this.headers,
          },
        });
      },
    });
  }

  withOrganization(orgId: string): this {
    this.headers["x-jwt-organization-id"] = orgId;
    return this;
  }

  withProject(projectId: string): this {
    this.headers["x-jwt-project-id"] = projectId;
    return this;
  }

  withApplication(applicationId: string): this {
    this.headers["x-jwt-application-id"] = applicationId;
    return this;
  }

  getClient(): ReturnType<typeof createAdminApiClient> {
    return this.client;
  }
}

export class AptosBuildApi {
  private static instance: AptosBuildApi | null = null;

  private constructor() {}

  public static getInstance(): AptosBuildApi {
    if (!AptosBuildApi.instance) {
      AptosBuildApi.instance = new AptosBuildApi();
    }
    return AptosBuildApi.instance;
  }

  private createContext(user: User): ClientContext {
    return new ClientContext(user, process.env.NEXT_PUBLIC_ADMIN_API_URL!);
  }

  public async setupChatbotApi(user: User): Promise<string> {
    const context = this.createContext(user);
    const baseClient = context.getClient();

    try {
      await baseClient.mutation([
        "signUpUser",
        {
          terms_accepted: true,
          gcp_marketplace_jwt: null,
        },
      ]);
    } catch (error) {
      const rpcError = error as RSPCError;
      if (rpcError?.message?.includes("Error executing query: P2002")) {
        // user already exists, so we can continue
      }
    }

    const orgs = await this.getOrganizations(baseClient);
    const org =
      orgs[0] ||
      (await baseClient.mutation([
        "createOrganization",
        {
          name: "Default Organization",
        },
      ]));

    // org and project are created by default, so theoretically we don't need to create them
    const orgContext = context.withOrganization(org.id);
    const orgClient = orgContext.getClient();

    const projects = await this.getProjects(orgClient);
    const project =
      projects[0] ||
      (await orgClient.mutation([
        "createProject",
        {
          project_name: "Default Project",
          description: "Default project for chatbot",
        },
      ]));

    // in default org and project, if application for AiChatbot service type doesn't exist, create it
    const projectContext = orgContext.withProject(project.id);
    const projectClient = projectContext.getClient();

    const applications = await this.getApplications(projectClient);
    const chatbotApp = applications.find(
      (app) => app.service_type === "AiChatbot" || app.name === "chatbot-app",
    ); // TODO: change service_type to 'AiChatbot'
    const application =
      chatbotApp ||
      (await projectClient.mutation([
        "createApplicationV2",
        {
          name: "chatbot-app",
          network: "testnet", // this doesn't matter for chatbot
          description: "Chatbot application",
          service_type: "All", // TODO: change service_type to 'AiChatbot'
        },
      ]));

    const fullContext = projectContext.withApplication(application.id);
    const fullClient = fullContext.getClient();

    const apiKeys = await this.getApiKeys(fullClient);
    const existingKey = apiKeys.find((key) => key.name === "chatbot-key");

    if (existingKey) {
      return existingKey.keySecret;
    }

    // Create new API key if none exists
    const apiKey = await fullClient.mutation([
      "createApiKeyV2",
      {
        name: "chatbot-key",
        frontend_args: {
          web_app_urls: [window.location.origin],
          // Extension IDs are 32-character strings derived from the extension's public key
          // For development, leave empty to allow all extensions
          // For production, get the ID from Chrome Web Store after publishing
          extension_ids: [],
          http_rate_limit_per_ip: 1000,
        },
      },
    ]);

    return apiKey.keySecret;
  }

  public async getOrganizations(
    client: ReturnType<typeof createAdminApiClient>,
  ): Promise<Organization[]> {
    const result = await client.query(["getOrganizations"]);
    return result as unknown as Organization[];
  }

  public async getProjects(
    client: ReturnType<typeof createAdminApiClient>,
  ): Promise<Project[]> {
    const result = await client.query(["getOrganizationProjects"]);
    return result as unknown as Project[];
  }

  public async getApplications(
    client: ReturnType<typeof createAdminApiClient>,
  ): Promise<Application[]> {
    const result = await client.query(["getProjectApplications"]);
    return result as unknown as Application[];
  }

  public async getApiKeys(
    client: ReturnType<typeof createAdminApiClient>,
  ): Promise<ApiKey[]> {
    const result = await client.query(["getApiKeysV2"]);
    return result as unknown as ApiKey[];
  }
}

export const aptosBuildApi = AptosBuildApi.getInstance();
