#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LearnCdkPipeLine } from '../lib/learn-cdk-pipeline';

const app = new cdk.App();


new LearnCdkPipeLine(app, 'fastApiBackendDevPipeLine', {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
    branch: "dev",
    stage: "devStage",
    repositoryName: "FastApiBackendRepository"
});
new LearnCdkPipeLine(app, 'fastApiBackendProdPipeLine', {
    env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
    branch: "prod",
    stage: "prodStage",
    repositoryName: "FastApiBackendRepository"
});

app.synth()