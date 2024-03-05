import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(248,148,0)",
      light: "rgb(248,187,107)",
    },
    secondary: {
      main: "rgb(139,129,121)",
      light: "rgb(203,196,190)",
    },
  },
});

export default function TitlebarImageList({ setStyleImage, nextStep }) {
  const handleClick = (event) => {
    console.log(event.currentTarget.src);
    setStyleImage(event.currentTarget.src);
    nextStep(3);
  };

  return (
    <ThemeProvider theme={theme}>
      <ImageList sx={{ p: 2 }}>
        <ImageListItem key="Subheader1" cols={2}>
          <ListSubheader
            component="div"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Claude Monet
          </ListSubheader>
        </ImageListItem>
        {monetImages.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}`}
              alt={item.alt}
              loading="lazy"
              onClick={handleClick}
            />
            <ImageListItemBar title={item.title} subtitle={item.author} />
          </ImageListItem>
        ))}
        <ImageListItem key="Subheader2" cols={2}>
          <ListSubheader
            component="div"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Pablo Picasso
          </ListSubheader>
        </ImageListItem>
        {picassoImages.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}`}
              alt={item.alt}
              loading="lazy"
              onClick={handleClick}
            />
            <ImageListItemBar title={item.title} subtitle={item.author} />
          </ImageListItem>
        ))}
        <ImageListItem key="Subheader3" cols={2}>
          <ListSubheader
            component="div"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Vincent van Gogh
          </ListSubheader>
        </ImageListItem>
        {vanGoghImages.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}`}
              alt={item.alt}
              loading="lazy"
              onClick={handleClick}
            />
            <ImageListItemBar title={item.title} subtitle={item.author} />
          </ImageListItem>
        ))}
        <ImageListItem key="Subheader4" cols={2}>
          <ListSubheader
            component="div"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Verschiedenes
          </ListSubheader>
        </ImageListItem>
        {variousImages.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${item.img}?fit=crop&auto=format&dpr=2 2x`}
              src={`${item.img}`}
              alt={item.alt}
              loading="lazy"
              onClick={handleClick}
            />
            <ImageListItemBar title={item.title} subtitle={item.author} />
          </ImageListItem>
        ))}
      </ImageList>
    </ThemeProvider>
  );
}

const monetImages = [
  {
    img: "stilbilder/Claude Monet/CLAUDE-MONET_SEEROSEN_CC-BY-SA_BSTGS_14562.jpg",
    title: "Seerosen, 1915",
    alt: "Monet-Seerosen",
    author: "Claude Monet",
  },
  {
    img: "stilbilder/Claude Monet/Claude_Monet_-_Grainstack_Sun_in_the_Mist.jpg",
    title: "Sun in the Mist",
    alt: "Monet-Grainstack",
    author: "Claude Monet",
  },
  {
    img: "stilbilder/Claude Monet/Claude_Monet_-_Marine_View_with_a_Sunset.jpg",
    title: "Marine View with a Sunset",
    alt: "Monet-MarineView",
    author: "Claude Monet",
  },
];

const picassoImages = [
  {
    img: "stilbilder/Picasso/Portrait-of-Ambroise-Vollard.png",
    title: "Portrait of Ambroise Vollard",
    author: "Pablo Picasso",
  },
  {
    img: "stilbilder/Picasso/The-Death-of-Casagemas.png",
    title: "The Death of Casagemas",
    author: "Pablo Picasso",
  },
  {
    img: "stilbilder/Picasso/the-old-guitarist.png",
    title: "The old Guitarist",
    author: "Pablo Picasso",
  },
  {
    img: "stilbilder/Picasso/The-Weeping-Woman.png",
    title: "The Weeping Woman",
    author: "Pablo Picasso",
  },
];

const vanGoghImages = [
  {
    img: "stilbilder/Van Gogh/800px-Vincent_Willem_van_Gogh_127.jpg",
    title: "Sonnenblumen",
    author: "Vincent van Gogh",
  },
  {
    img: "stilbilder/Van Gogh/starry_night.jpg",
    title: "Starry Night",
    author: "Vincent van Gogh",
  },
  {
    img: "stilbilder/Van Gogh/the-starry-night-painting.jpg",
    title: "The starry night",
    author: "Vincent van Gogh",
  },
  {
    img: "stilbilder/Van Gogh/vangoghmuseum-s0016V1962-800.jpg",
    title: "Selbstprotrait",
    author: "Vincent van Gogh",
  },
  {
    img: "stilbilder/Van Gogh/vangoghmuseum-s0051V1962-800.jpg",
    title: "Selbstprotrait",
    author: "Vincent van Gogh",
  },
  {
    img: "stilbilder/Van Gogh/vangoghmuseum-s0083V1962-800.jpg",
    title: "Selbstprotrait",
    author: "Vincent van Gogh",
  },
];

const variousImages = [
  {
    img: "stilbilder/die-große-welle-von-kanagawa.jpg",
    title: "Die große Welle",
    author: "Kanagawa",
  },
  {
    img: "stilbilder/Edvard_Munch_1893_The_Scream.jpg",
    title: "The Scream, 1893",
    author: "Edvard Munch",
  },
  {
    img: "stilbilder/number-8-detail1.jpg",
    title: "Nr 8",
    author: "Nachschauen",
  },
  {
    img: "stilbilder/Vassily_Kandinsky,_1913_-_Composition_7.jpg",
    title: "Composition 7, 1913",
    author: "Vassily Kandinsky",
  },
  {
    img: "stilbilder/violin-and-jug-1910-by-Georges-Braque.jpg",
    title: "Violin and Jug, 1910",
    author: "Georges Braque",
  },
];
