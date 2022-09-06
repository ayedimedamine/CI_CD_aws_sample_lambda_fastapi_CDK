import { Stack, StackProps, aws_ssm as ssm } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigtw from 'aws-cdk-lib/aws-apigateway';
import * as codecommit from "aws-cdk-lib/aws-codecommit";
import { RestApiInfos } from "./interfaces/RestApiInfos"
interface sharedStackProps extends StackProps {
    repositoryName: string;
}

export class sharedResourcesStack extends Stack {
    public readonly repositoryName: string;
    // public readonly restapiINFO: RestApiInfos = { 'restApiId': "", "restApiRootResourceId": "" };
    constructor(scope: Construct, id: string, props: sharedStackProps) {
        super(scope, id, props);

        // this.repository = codecommit.Repository.fromRepositoryName(this, "fastApiRepo", props.repositoryName);
        this.repositoryName = new codecommit.Repository(this, "fastApiRepo", { repositoryName: props.repositoryName }).repositoryName
        const restApi = new apigtw.RestApi(this, "serverlessBackendAPI", {
            deploy: false
        });
        restApi.root.addCorsPreflight({
            allowOrigins: ["*"]
        })
        // const restApiINFO = JSON.stringify({ "restApiId": restApi.restApiId, "restApiRootResourceId": restApi.restApiRootResourceId })
        // console.log("maybee ? == ", restApi.restApiId)
        new ssm.StringParameter(
            this,
            "RestApi-restApiId",
            {
                description: "parameter restApiId",
                parameterName: "/serverless/backend/sharedResources/RestApi/restApiId",
                stringValue: restApi.restApiId
            }
        );
        new ssm.StringParameter(
            this,
            "RestApi-restApiRootResourceId",
            {
                description: "parameter restApiRootResourceId",
                parameterName: "/serverless/backend/sharedResources/RestApi/restApiRootResourceId",
                stringValue: restApi.restApiRootResourceId
            }
        );
    }


}
