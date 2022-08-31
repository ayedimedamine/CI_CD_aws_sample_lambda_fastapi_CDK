import { CfnOutput, Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LearnCdkStack } from './learn-cdk-stack';
/**
 * Deployable unit of web service app
 */
export class LearnCdkStage extends Stage {
    public readonly urlOutput: CfnOutput;

    constructor(scope: Construct, id: string, props?: StageProps) {
        super(scope, id, props);
        const service = new LearnCdkStack(this, 'FastApiBackendStack');
        this.urlOutput = service.urlOutput;
    }
}