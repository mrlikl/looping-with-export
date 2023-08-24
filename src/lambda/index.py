import cfnresponse
import json


def handler(event, context):
    print(event)
    responseData = {
        "InstanceIds": "muralikl1,muralikl2,muralikl3"
    }
    cfnresponse.send(event, context, cfnresponse.SUCCESS,
                     responseData, "CustomResourcePhysicalID")
