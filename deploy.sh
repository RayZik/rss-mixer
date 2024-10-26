#!/bin/bash

if [ -z "$1" ]; then
  echo "Usage: ./deploy.sh <function-name>"
  exit 1
fi

FUNCTION_NAME=$1
ZIP_FILE="build.zip"
ENTRYPOINT="index.handler"
RUNTIME="nodejs18"
MEMORY="512m"
TIMEOUT="5s"
BUCKET_NAME="a.zikrackiy-cloud-functions"
OBJECT_NAME="build.zip"

echo "Cleaning up old zip file..."
rm -f $ZIP_FILE

echo "Copying node_modules and package.json to dist..."
cp -R node_modules dist/node_modules
cp package.json dist/package.json

echo "Creating zip file..."
cd dist || exit 1
zip -r ../$ZIP_FILE ./*
cd ..

echo "Uploading zip file to Object Storage..."
yc storage s3api put-object --bucket $BUCKET_NAME --key $OBJECT_NAME --body $ZIP_FILE

echo "Deploying function $FUNCTION_NAME from Object Storage..."
yc serverless function version create \
  --function-name $FUNCTION_NAME \
  --runtime $RUNTIME \
  --entrypoint $ENTRYPOINT \
  --memory $MEMORY \
  --execution-timeout $TIMEOUT \
  --package-bucket-name $BUCKET_NAME \
  --package-object-name $OBJECT_NAME

echo "Deployment of $FUNCTION_NAME completed successfully."
