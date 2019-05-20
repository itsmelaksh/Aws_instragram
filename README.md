## References
https://github.com/aws-amplify/amplify-js/wiki/Local-Development
http://hpc.imbiplaza.net/?p=912
locally build aws using codebuild
https://aws.amazon.com/blogs/devops/announcing-local-build-support-for-aws-codebuild/
# Cloud Computing Application
---

Application that showcases how to build application with AWS cloud services.

## Pre-requisites
1. node v8.9.1 (or node carbon)
2. yarn
3. docker
4. AWS Account for services's API key: Cognito, AppSync, S3, DynamoDB, Lambda, etc

## How to run
```
For development:
1. Update src/config.js file with AWS services API key
2. Run `yarn start`
3. Development side will be opened

For production (using Docker):
1. By default, src/config.js is using environment variables to store AWS key. Please make sure you revert any changes if you changed it in development process.
2. Build docker image => `docker build -t <REPO_NAME>/<IMAGE_NAME> .`
3. Create `env.list` that contain your environment variables. For example:
    # env.list (env var need to start with REACT_APP_)
    REACT_APP_COGNITO_1=xxxxx
4. Run docker image => `docker run -p 8080:8080 --env-file ./env.list -d <REPO_NAME>/<IMAGE_NAME>`

For production (static server):
1. Update src/config.js
2. Run `yarn build`
3. Install `serve` => `npm install -g serve@7.1.1`
4. Run `serve -s -l 8080 build`
```
