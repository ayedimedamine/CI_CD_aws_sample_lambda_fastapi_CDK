import { pipelines, Stack, StackProps } from "aws-cdk-lib";
import * as codecommit from "aws-cdk-lib/aws-codecommit";
import { Construct } from "constructs";
import { LearnCdkStage } from "./learn-cdk-stage";

/**
 * The stack that defines the application pipeline
 */
interface PipeLineProps extends StackProps {
    branch: string;
    stage: string;
    repositoryName: string;
}

export class LearnCdkPipeLine extends Stack {
    constructor(scope: Construct, id: string, props: PipeLineProps) {
        super(scope, id, props);

        const backendFastapiServerless = codecommit.Repository.fromRepositoryName(this, "fastApiRepo", props.repositoryName);


        const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
            synth: new pipelines.ShellStep('Synth', {
                // Use a connection created using the AWS console to authenticate to GitHub
                // Other sources are available.

                input: pipelines.CodePipelineSource.codeCommit(backendFastapiServerless, props.branch),
                commands: [
                    'npm ci',
                    'npm run build',
                    'npx cdk synth',
                ],
            }),
        });
        const stage = new LearnCdkStage(this, props.stage);
        pipeline.addStage(stage)
    }
}