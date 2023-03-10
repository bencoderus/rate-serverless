import { API } from "./stacks/api-stack";

export default {
  config(_input) {
    return {
      name: "rate-service",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(API);
  },
} 