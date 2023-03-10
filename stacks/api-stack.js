import { Api } from "sst/constructs";

export function API({ stack }) {
  const api = new Api(stack, "api", {
    routes: {
      $default: "src/handler.handler",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
