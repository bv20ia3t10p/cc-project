import { useState } from "react";

interface IPageLayout {
  isHeaderHidden: boolean;
}

export const usePageLayout = () => {
  const [pageProperties, setPageProperties] = useState<IPageLayout>({
    isHeaderHidden: false,
  });
  const hideHeader = () => {
    setPageProperties({ ...pageProperties, isHeaderHidden: true });
  };
  const enableHeader = () => {
    setPageProperties({ ...pageProperties, isHeaderHidden: false });
  };
  return {
    enableHeader,
    hideHeader,
    isHeaderHidden: pageProperties.isHeaderHidden,
  };
};
