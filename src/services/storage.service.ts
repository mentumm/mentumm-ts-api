import AWS from "aws-sdk";

const spacesEndpoint = new AWS.Endpoint("nyc3.digitaloceanspaces.com");
const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: "YOUR_ACCESS_KEY",
  secretAccessKey: "YOUR_SECRET_KEY",
});

// Function to upload file
export const uploadToSpaces = async (file: Express.Multer.File) => {
  const uploadParams = {
    Bucket: "YOUR_BUCKET_NAME",
    Key: "YOUR_DESIRED_KEY", // file name, you can use user id or something unique
    Body: file.stream, // or file.buffer if you're using memory storage
    ACL: "public-read", // if you want the file to be publicly accessible
  };

  return s3.upload(uploadParams).promise();
};
