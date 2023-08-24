import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cfn from 'aws-cdk-lib/aws-cloudformation';
import * as cfninc from 'aws-cdk-lib/cloudformation-include';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';

export interface ImportStackProps extends cdk.StackProps {
    instanceIds: string;
}

export class ImportStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props: ImportStackProps) {
        super(scope, id, props);

        const template_asset = new Asset(this, 'SampleSingleFileAsset', {
            path: 'src/my-template.yml'
        });

        const stack = new cfn.CfnStack(this, 'NestedUtilStack', {
            templateUrl: template_asset.httpUrl,
            parameters: {
                pInstanceIds: props.instanceIds
            }
        })

    }
}
