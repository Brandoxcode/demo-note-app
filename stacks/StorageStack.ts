import { Bucket, Table } from "sst/constructs";

export function StorageStack(input: StorageStackInput): StorageStackRes {
    // Create the DynamoDB table
    const { stack, app } = input
    // Create an S3 bucket
    const bucket = new Bucket(stack, "Uploads");
    const table = new Table(stack, "Notes", {
        fields: {
            userId: "string",
            noteId: "string",
        },
        primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
    });

    return {
        table,
        bucket,
    };
}

export type StorageStackInput = {
    stack: any;
    app: any;
}

export type StorageStackRes = {
    table: Table;
    bucket: Bucket;
}