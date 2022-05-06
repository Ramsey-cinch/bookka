import { Duration, Stack, StackProps } from "aws-cdk-lib";
import * as sqs from "aws-cdk-lib/aws-sqs";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as path from "path";

export class BookkaStack extends Stack {
  private clientHandlerPath = "../src/client/handlers";

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, "reservation-queue", {
      visibilityTimeout: Duration.seconds(15),
    });

    const addReservationToQueue = new NodejsFunction(
      this,
      "addReservationToQueue",
      {
        runtime: lambda.Runtime.NODEJS_14_X,
        memorySize: 1024,
        timeout: Duration.seconds(5),
        entry: path.join(
          __dirname,
          `${this.clientHandlerPath}/addReservationToQueue.ts`
        ),
        handler: "handler",
        bundling: {
          externalModules: [
            "aws-sdk", // Use the 'aws-sdk' available in the Lambda runtime
          ],
        },
        depsLockFilePath: path.join(__dirname, "../yarn.lock"),
      }
    );
  }
}
