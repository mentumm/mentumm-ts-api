import AWS from "aws-sdk";

const spacesEndpoint = new AWS.Endpoint(
  process.env.DIGITALOCEAN_SPACES_ENDPOINT ||
    "https://sfo3.digitaloceanspaces.com"
);

const s3 = new AWS.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.DIGITALOCEAN_SPACES_KEY,
  secretAccessKey: process.env.DIGITALOCEAN_SPACES_SECRET,
});

export const uploadFileToSpaces = async (
  file: Express.Multer.File,
  userId: number
) => {
  const uploadParams = {
    Bucket: process.env.DIGITALOCEAN_SPACES_BUCKET || "mentummportal",
    Key: `users/avatars/${userId}/${file.originalname}`,
    Body: file.buffer,
    ACL: "public-read",
  };
  try {
    const result = s3.upload(uploadParams).promise();
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
