import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as pythonLambda from "@aws-cdk/aws-lambda-python-alpha";
import * as apigtw from 'aws-cdk-lib/aws-apigateway';


export class LearnCdkStack extends Stack {
  /**
    * The URL of the API Gateway endpoint, for use in the integ tests
    */
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaHandlerFunction = new pythonLambda.PythonFunction(this, "lambdaHandlerFunction", {
      runtime: lambda.Runtime.PYTHON_3_9,    // execution environment
      entry: lambda.Code.fromAsset('backend').path,  // code loaded from "backend" directory
      handler: 'handler',
      index: "main.py",
      layers: [
        new pythonLambda.PythonLayerVersion(this, 'FastApiLambdaLayer', {
          entry: lambda.Code.fromAsset('backend').path + "/appLayer",
        }),
      ]
    });



    const gtw = new apigtw.LambdaRestApi(this, "EndpointAPi", {
      handler: lambdaHandlerFunction,
      proxy: true
    });

    this.urlOutput = new CfnOutput(this, 'Url', {
      value: gtw.url,
    });
  }
}
