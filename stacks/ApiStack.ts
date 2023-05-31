import { Api, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

authorizer: "iam"
export function ApiStack(input: ApiStackInp): ApiStackRes {
    const { stack, app } = input
    const { table } = use(StorageStack);

    // Create the API
    const api = new Api(stack, "Api", {
        defaults: {
            function: {
                bind: [table],
            },
        },
        routes: {
            "GET /notes": "packages/functions/src/list.main",
            "POST /notes": "packages/functions/src/create.main",
            "GET /notes/{id}": "packages/functions/src/get.main",
            "PUT /notes/{id}": "packages/functions/src/update.main",
            "DELETE /notes/{id}": "packages/functions/src/delete.main",
        },
    });

    // Show the API endpoint in the output
    stack.addOutputs({
        ApiEndpoint: api.url,
    });

    // Return the API resource
    return {
        api,
    };
}

export type ApiStackInp = {
    stack: any;
    app: any;
}

export type ApiStackRes = {
    api: Api;
}