import { useState } from "react";
import ImageFetcher from "./getAusgabebild";
import FileUploader from "./postContentPic";
import StyleFileUploader from "./postStylePic";

export default function ServerCom({ contentImage, styleImage }) {
  const [isStyleTransferFinished, setStyleTransferFinished] = useState(false);

  return (
    <>
      <FileUploader photo={contentImage}></FileUploader>
      <StyleFileUploader image={styleImage}></StyleFileUploader>
      {isStyleTransferFinished ? <ImageFetcher></ImageFetcher> : null}
    </>
  );
}
