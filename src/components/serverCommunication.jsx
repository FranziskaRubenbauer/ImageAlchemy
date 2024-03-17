import { useState, useEffect } from "react";
import ContentImageSenderComponent from "./postContentPic";
import StyleImageSenderComponent from "./postStylePic";
import NotebookRunner from "./notebookRunner";

export default function ServerCom({
  contentImage,
  styleImage,
  setOutputImage,
  setActiveStep,
}) {
  const [isStyleTransferFinished, setStyleTransferFinished] = useState(false);
  const [isUploadFinished, setUploadFinished] = useState(false);
  const [isStyleUploadFinished, setStyleUploadFinished] = useState(false);
  const [isContentUploadFinished, setContentUploadFinished] = useState(false);

  function handleClick() {
    setUploadFinished(true);
  }
  useEffect(() => {
    if (isStyleTransferFinished) {
      setActiveStep(4);
    }
  }, [isStyleTransferFinished]);

  useEffect(() => {
    if (isStyleUploadFinished && isContentUploadFinished) {
      setUploadFinished(true);
      console.log("Upload true");
    }
  }, [isStyleUploadFinished, isContentUploadFinished]);

  return (
    <>
      <ContentImageSenderComponent
        photo={contentImage}
        setBool={setContentUploadFinished}
      ></ContentImageSenderComponent>
      <StyleImageSenderComponent
        image={styleImage}
        setBool={setStyleUploadFinished}
      ></StyleImageSenderComponent>
      {isUploadFinished ? (
        <NotebookRunner
          setOutputImage={setOutputImage}
          setStyleTransferFinished={setStyleTransferFinished}
        ></NotebookRunner>
      ) : null}
    </>
  );
}
