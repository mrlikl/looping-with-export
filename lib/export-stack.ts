import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as _lambda from 'aws-cdk-lib/aws-lambda';

export class ExportStack extends cdk.Stack {
  public readonly instanceIds: string;
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new _lambda.Function(this, "CRFunc", {
      code: _lambda.Code.fromAsset('src/lambda'),
      runtime: _lambda.Runtime.PYTHON_3_11,
      handler: 'index.handler'
    })

    const resource = new cdk.CustomResource(this, 'CustomEC2TagFetcherResource', {
      serviceToken: fn.functionArn,
      properties: {
        "test": "value"
      }
    });

    this.instanceIds = resource.getAtt('InstanceIds').toString();
  }
}
