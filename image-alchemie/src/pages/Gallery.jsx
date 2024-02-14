import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import BasicPopover from "../components/popup.jsx";

const itemData = [
  {
    img: "/transfer-beispiele/Versuch1_Ausgabe.png",
    title: "Versuch1",
  },
  {
    img: "/transfer-beispiele/Versuch2_Ausgabe.png",
    title: "Versuch2",
  },
  {
    img: "/transfer-beispiele/Versuch3_Ausgabe.png",
    title: "Versuch3",
  },
  {
    img: "/transfer-beispiele/Versuch4_Ausgabe.png",
    title: "Versuch4",
  },
  {
    img: "/transfer-beispiele/Versuch5_Ausgabe.png",
    title: "Versuch5",
  },
  {
    img: "/transfer-beispiele/Versuch6_Ausgabe.png",
    title: "Versuch6",
  },
  {
    img: "/transfer-beispiele/Versuch7_Ausgabe.png",
    title: "Versuch7",
  },
  {
    img: "/transfer-beispiele/Versuch8_Ausgabe.png",
    title: "Versuch8",
  },
  {
    img: "/transfer-beispiele/Versuch9_Ausgabe.png",
    title: "Versuch9",
  },
  {
    img: "/transfer-beispiele/Versuch10_Ausgabe.png",
    title: "Versuch10",
  },
];

export default function Gallery() {
  let navigate = useNavigate();
  const [imageNr, setImageNr] = useState("");

  //Für PopUp
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setImageNr(event.currentTarget.alt);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  function handleBackClick() {
    navigate("/");
  }

  return (
    <>
      <ImageList
        sx={{ width: "100vw", height: "80%" }}
        cols={2}
        rowHeight={164}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?w=16&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}?w=16&h=164&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
              onClick={handleClick}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Button
        variant="contained"
        onClick={handleBackClick}
        sx={{
          margin: "0 auto",
          textAlign: "center",
          width: "30%",
        }}
      >
        Zurück
      </Button>
      <BasicPopover
        anchorEl={anchorEl}
        handleClose={handleClose}
        open={open}
        imgNr={imageNr}
      />
    </>
  );
}
