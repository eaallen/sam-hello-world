const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB()
const uuid = require('uuid')
const tableName = process.env.TABLE_NAME

let response;

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */



exports.lambdaHandler = async (event, context) => {
    try {
        const get_params = {
            TableName: tableName,
            Select: "ALL_ATTRIBUTES"
          };
  
          const list_response = await ddb.scan(get_params).promise();
          
          response = {
              'statusCode': 200,
              'body': JSON.stringify({
                  message: list_response.Items,
                  // location: ret.data.trim()
              })
          }
  
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};
