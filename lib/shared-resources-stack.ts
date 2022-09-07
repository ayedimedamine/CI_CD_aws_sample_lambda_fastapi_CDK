import { Stack, StackProps, aws_ssm as ssm } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as apigtw from 'aws-cdk-lib/aws-apigateway';
import * as codecommit from "aws-cdk-lib/aws-codecommit";
interface sharedStackProps extends StackProps {
    repositoryName: string;
}

export class sharedResourcesStack extends Stack {
    public readonly repositoryName: string;
    constructor(scope: Construct, id: string, props: sharedStackProps) {
        super(scope, id, props);

        this.repositoryName = new codecommit.Repository(this, "fastApiRepo", { repositoryName: props.repositoryName }).repositoryName
        const restApi = new apigtw.RestApi(this, "serverlessBackendAPI", {
            deploy: false
        });
        restApi.root.addCorsPreflight({
            allowOrigins: ["*"]
        })

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
