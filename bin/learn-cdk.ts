#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LearnCdkPipeLine } from '../lib/learn-cdk-pipeline';
import { sharedResourcesStack } from '../lib/shared-resources-stack';
const app = new cdk.App();

const sharedResources = new sharedResourcesStack(app, "sharedResources", {
    repositoryName: "FastApiBackendRepository"

})
new LearnCdkPipeLine(app, 'fastApiBackendDevPipeLine', {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
    branch: "dev",
    stage: "devStage",
    repositoryName: sharedResources.repositoryName,
    // restapiINFO: sharedResources.restapiINFO
    // repositoryName: "FastApiBackendRepository"
});
new LearnCdkPipeLine(app, 'fastApiBackendProdPipeLine', {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
    branch: "prod",
    stage: "prodStage",
    // repositoryName: "FastApiBackendRepository"
    repositoryName: sharedResources.repositoryName,
    // restapiINFO: sharedResources.restapiINFO
});

app.synth()