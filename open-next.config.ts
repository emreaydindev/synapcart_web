import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Every page is static or client-rendered, so no incremental cache binding is needed.
export default defineCloudflareConfig();
