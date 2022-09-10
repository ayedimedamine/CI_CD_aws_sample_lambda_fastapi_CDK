#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { sharedResourcesStack } from '../lib/shared-resources-stack';
import { LearnCdkPipeLine } from '../lib/learn-cdk-pipeline';

const app = new cdk.App();

const sharedResources = new sharedResourcesStack(app, "sharedResources", {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
    repositoryName: "FastApiBackendRepository"

});
new LearnCdkPipeLine(app, 'fastApiBackendDevPipeLine', {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
    branch: "dev",
    stage: "devStage",
    repositoryName: sharedResources.repositoryName,
})
new LearnCdkPipeLine(app, 'fastApiBackendProdPipeLine', {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
    branch: "prod",
    stage: "prodStage",
    // repositoryName: "FastApiBackendRepository"
    repositoryName: sharedResources.repositoryName
});