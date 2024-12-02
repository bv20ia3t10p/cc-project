import ImageApiClient from "@/utils/api/api-client/ImageApiClient";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";

export const useImageService = () => {
    const { message } = App.useApp();
    let imageUrl = '';
    const { mutate: upload, isPending, isError, isSuccess } = useMutation<
        // Type the mutation to accept the File and return any type of response
        string,
        Error,
        File,
        unknown
    >(
        {
            mutationFn: async (file: File) => {
                const imageApiClient = new ImageApiClient();
                // Make the request to upload the image using the ImageApiClient
                const resp = await imageApiClient.uploadImage(file);
                return resp;
            },
            onMutate: () => {
                message.loading({ content: 'Uploading image...', key: 'upload' });
            },
            onSuccess: () => {
                message.success({ content: 'Image uploaded successfully!', key: 'upload' });
            },
            onError: () => {
                message.error({ content: 'Failed to upload image', key: 'upload' });
            },
            onSettled: () => {
                message.destroy('upload');
            }
        }
    );

    return {
        upload,
        isPending,
        isError,
        imageUrl,
        isSuccess
    };
};
