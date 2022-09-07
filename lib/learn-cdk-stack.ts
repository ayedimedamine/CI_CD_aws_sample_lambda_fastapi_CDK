import { aws_ssm as ssm, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as pythonLambda from "@aws-cdk/aws-lambda-python-alpha";
import * as apigtw from "aws-cdk-lib/aws-apigateway";

interface backendStackProps extends StackProps {

  branch: string;
  stageName: string;
}
export class LearnCdkStack extends Stack {
  constructor(scope: Construct, id: string, props: backendStackProps) {
    super(scope, id, props);

    const lambdaHandlerFunction = new pythonLambda.PythonFunction(
      this,
      "lambdaHandlerFunction",
      {
        runtime: lambda.Runtime.PYTHON_3_9, // execution environment
        entry: lambda.Code.fromAsset("backend").path, // code loaded from "backend" directory
        handler: "handler",
        index: "main.py",
      }
    );
    lambdaHandlerFunction.addEnvironment("STAGE", props.stageName);
    const restApiId = ssm.StringParameter.fromStringParameterAttributes(
      this,
      "RestApi-restApiId",
      { parameterName: "/serverless/backend/sharedResources/RestApi/restApiId" }
    );
    const restApiRootResourceId = ssm.StringParameter.fromStringParameterAttributes(
      this,
      "RestApi-restApiRootResourceId",
      { parameterName: "/serverless/backend/sharedResources/RestApi/restApiRootResourceId" }
    );

    const restApi = apigtw.RestApi.fromRestApiAttributes(this, "BackendRestApi", {
      restApiId: restApiId.stringValue,
      rootResourceId: restApiRootResourceId.stringValue
    })

    restApi.root.addProxy({ defaultIntegration: new apigtw.LambdaIntegration(lambdaHandlerFunction), anyMethod: true })
    const deployment = new apigtw.Deployment(this, 'Deployment', { api: restApi });

    new apigtw.Stage(this, props.stageName, {
      deployment: deployment,
      stageName: props.stageName
    });
  }
}
