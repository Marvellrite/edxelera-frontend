import { http } from "@/lib/api/client";

export type PresignedUploadUrlRequest = {
  fileType: string;
  title: string;  // can be name of the course or name of the file
};

export type PresignedUploadUrlResponse = {
  upload_url: string;
  key: string;
};

const presignedUploadUrlEndpoint = "/api/uploads/presigned-url";

export async function getPresignedUploadUrl(
  payload: PresignedUploadUrlRequest,
) {
  try {
    return await http.post<PresignedUploadUrlResponse>(
      presignedUploadUrlEndpoint,
      payload,
    );
  } catch (error) {
    throw new Error("Failed to generate a presigned upload URL.", {
      cause: error,
    });
  }
}

export async function uploadFileToS3(file: File, title: string) {
  const { key, upload_url: uploadUrl } = await getPresignedUploadUrl({
    fileType: file.type,
    title,
  });

  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error(
      `Failed to upload file to S3. Status: ${uploadResponse.status}`,
    );
  }

  return key;
}
