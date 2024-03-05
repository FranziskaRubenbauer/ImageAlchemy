import { useState, useEffect } from "react";
import ImageFetcher from "./getAusgabebild";
import FileUploader from "./postContentPic";
import StyleFileUploader from "./postStylePic";
import NotebookRunner from "./notebookRunner";

export default function ServerCom({
  contentImage,
  styleImage,
  setOutputImage,
}) {
  const [isStyleTransferFinished, setStyleTransferFinished] = useState(false);
  const [isUploadFinished, setUploadFinished] = useState(false);
  const [isStyleUploadFinished, setStyleUploadFinished] = useState(false);
  const [isContentUploadFinished, setContentUploadFinished] = useState(false);

  useEffect(() => {
    if (isStyleUploadFinished && isContentUploadFinished) {
      setUploadFinished(true);
      console.log("Upload true");
    }
  }, [isStyleUploadFinished, isContentUploadFinished]);

  return (
    <>
      <FileUploader
        photo={contentImage}
        setBool={setContentUploadFinished}
      ></FileUploader>
      <StyleFileUploader
        image={styleImage}
        setBool={setStyleUploadFinished}
      ></StyleFileUploader>
      {isUploadFinished ? (
        <NotebookRunner setBool={setStyleTransferFinished}></NotebookRunner>
      ) : null}
      {isStyleTransferFinished ? (
        <ImageFetcher setOutputImage={setOutputImage}></ImageFetcher>
      ) : null}
    </>
  );
}
