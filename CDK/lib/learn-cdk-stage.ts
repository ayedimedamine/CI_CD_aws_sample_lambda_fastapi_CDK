import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LearnCdkStack } from './learn-cdk-stack';

interface BackendStageProps extends StageProps {
    branch: string;
    stageName: string;
}
export class LearnCdkStage extends Stage {

    constructor(scope: Construct, id: string, props: BackendStageProps) {
        super(scope, id, props);
        new LearnCdkStack(this, 'FastApiBackendStack', {
            branch: props.branch,
            stageName: props.stageName
        })

    }
}