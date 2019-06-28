const config = {
    // Cognito Config
    'aws_cognito_identity_pool_id': 'ap-southeast-1:e85cf38b-165e-4a70-9343-8eff5eddf8e8',
    // Get from AWS Cognito console -> Manage Federated Identities -> (App Name) -> Edit identity pool
    'aws_cognito_region': 'ap-southeast-1',
    
    // S3 Config for Images
    'aws_user_files_s3_bucket': "cloudcomputing-cloudenv-20190626022446-deployment",
    'aws_user_files_s3_bucket_region': 'ap-southeast-1',

    // Cognito User Pools Config
    'aws_user_pools_id': 'ap-southeast-1_ynH4K9DMc',
    'aws_user_pools_web_client_id': '3af5k6oivjr2pjku1v5cbktnd5',

    // Appsync Config
    //'aws_appsync_graphqlEndpoint': process.env.REACT_APP_APPSYNC_1,
    'aws_appsync_graphqlEndpoint': "https://umuxjgrmwnfijbrcvaavrjztji.appsync-api.ap-southeast-1.amazonaws.com/graphql",
    //'aws_appsync_region': process.env.REACT_APP_APPSYNC_2,
    'aws_appsync_region': 'ap-southeast-1',
    /*'aws_appsync_authenticationType': process.env.REACT_APP_APPSYNC_3,*/
    'aws_appsync_authenticationType': "API_KEY",
}

export default config;

