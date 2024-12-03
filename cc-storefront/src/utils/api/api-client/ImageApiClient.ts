import { Environment } from "@/utils/env/Environment";
import { ApiClient } from "./ApiClient";
import { HeaderConfiguration } from "@/models/api/HeaderConfiguration";
import FormData from "form-data"; // If using Node.js, make sure to install form-data package
import { useNavigate } from "react-router";

export class ImageResp {
  ImageUrl: string;
  /**
   *
   */
  constructor({ ImageUrl }: { ImageUrl: string }) {
    this.ImageUrl = ImageUrl;
  }
}

class ImageApiClient extends ApiClient<ImageResp> {
  constructor() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("account") ?? "");
    if (!user) navigate("/login");
    super(
      Environment.getEnvVariable("IMAGE_SERVICE"),
      new HeaderConfiguration({ auth: "Bearer " + user.accessToken })
    );
  }

  public async uploadImage(file: File) {
    // Create FormData object
    const formData = new FormData();
    formData.append("file", file);

    // Send the POST request to upload the image
    const response = await this.post({
      path: "upload", // Path to your upload API endpoint
      body: formData as any, // FormData needs to be sent as the request body
    });

    return response.ImageUrl;
  }
}

export default ImageApiClient;
