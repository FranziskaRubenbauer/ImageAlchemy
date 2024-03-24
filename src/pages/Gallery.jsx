import { useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import BasicPopover from "../components/popup.jsx";

const itemData = [
  {
    img: "/transfer-beispiele/ausgabebild1.png",
    title: "1",
  },
  {
    img: "/transfer-beispiele/Ausgabebild3.png",
    title: "3",
  },
  {
    img: "/transfer-beispiele/Ausgabebild5.png",
    title: "5",
  },
  {
    img: "/transfer-beispiele/Ausgabebild9.png",
    title: "9",
  },
  {
    img: "/transfer-beispiele/Ausgabebild12.png",
    title: "12",
  },
  {
    img: "/transfer-beispiele/Ausgabebild13.png",
    title: "13",
  },
  {
    img: "/transfer-beispiele/Ausgabebild15.png",
    title: "15",
  },
  {
    img: "/transfer-beispiele/Ausgabebild16.png",
    title: "16",
  },
  {
    img: "/transfer-beispiele/Ausgabebild17.png",
    title: "17",
  },
  {
    img: "/transfer-beispiele/Ausgabebild18.png",
    title: "18",
  },
  {
    img: "/transfer-beispiele/Ausgabebild19.png",
    title: "19",
  },
  {
    img: "/transfer-beispiele/Ausgabebild23.png",
    title: "23",
  },
  {
    img: "/transfer-beispiele/Ausgabebild26.png",
    title: "26",
  },
  {
    img: "/transfer-beispiele/Ausgabebild27.png",
    title: "27",
  },
  {
    img: "/transfer-beispiele/Ausgabebild28.png",
    title: "28",
  },
  {
    img: "/transfer-beispiele/Ausgabebild36.png",
    title: "36",
  },
  {
    img: "/transfer-beispiele/Ausgabebild39.png",
    title: "39",
  },
  {
    img: "/transfer-beispiele/Ausgabebild42.png",
    title: "42",
  },
  {
    img: "/transfer-beispiele/Ausgabebild43.png",
    title: "43",
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
    navigate("/home");
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
