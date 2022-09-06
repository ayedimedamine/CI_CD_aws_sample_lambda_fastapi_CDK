import { Stage, StageProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LearnCdkStack } from './learn-cdk-stack';
import { RestApiInfos } from "./interfaces/RestApiInfos"
/**
 * Deployable unit of web service app
 */
interface BackendStageProps extends StageProps {
    branch: string;
    // restapiINFO: RestApiInfos;
    stageName: string;
}
export class LearnCdkStage extends Stage {

    constructor(scope: Construct, id: string, props: BackendStageProps) {
        super(scope, id, props);
        new LearnCdkStack(this, 'FastApiBackendStack', {
            branch: props.branch,
            // restapiINFO: props.restapiINFO,
            stageName: props.stageName
        })

    }
}