#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ExportStack } from '../lib/export-stack';
import { ImportStack } from '../lib/import-stack';

const app = new cdk.App();

const cr_stack = new ExportStack(app, 'CdktsStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});

const util_stack = new ImportStack(app, 'UtilStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  instanceIds: cr_stack.instanceIds
})