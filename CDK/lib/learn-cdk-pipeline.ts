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

        const repository = codecommit.Repository.fromRepositoryName(this, "fastApiRepo", props.repositoryName);
        const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
            synth: new pipelines.ShellStep('Synth', {

                input: pipelines.CodePipelineSource.codeCommit(repository, props.branch),
                commands: [
                    'cd CDK',
                    'npm ci',
                    'npm run build',
                    'npx cdk synth',
                ],
            }

            ),
            dockerEnabledForSynth: true
        });

        const stage = new LearnCdkStage(this, props.stage, {
            branch: props.branch,
            stageName: props.stage
        });
        pipeline.addStage(stage)
    }
}