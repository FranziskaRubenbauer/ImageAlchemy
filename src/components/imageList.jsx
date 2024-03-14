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
            August Macke
          </ListSubheader>
        </ImageListItem>
        {mackeImages.map((item) => (
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
        <ImageListItem key="Subheader5" cols={2}>
          <ListSubheader
            component="div"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Geoeges Braque
          </ListSubheader>
        </ImageListItem>
        {braqueImages.map((item) => (
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
        <ImageListItem key="Subheader6" cols={2}>
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
    img: "stilbilder/Claude Monet/Claude_Monet_-_Grainstack_Sun_in_the_Mist.jpg",
    title: "Seerosen, 1915",
    alt: "Monet-Grainstack",
    author: "Claude Monet",
  },
  {
    img: "stilbilder/Claude Monet/Claude_Monet_Morning_on_the_Seine.jpg",
    title: "Morning on the Seine, 1898",
    alt: "Monet-Morning",
    author: "Claude Monet",
  },
  {
    img: "stilbilder/Claude Monet/Claude_Monet_The_Japanese_Footbridge.jpg",
    title: "The Japanese Footbridge, 1920-1922",
    alt: "Monet-Japanese",
    author: "Claude Monet",
  },
  {
    img: "stilbilder/Claude Monet/Claude_Monet_Undergrowth_in_the_Forest_of_Saint_Germain.jpg",
    title: "Undergrowth in the Forest of Saint-Germain, 1882",
    alt: "Monet-Undergrowth",
    author: "Claude Monet",
  },
  {
    img: "stilbilder/Claude Monet/Claude_Monet_Waves_Breaking.jpg",
    title: "Waves Breaking, 1881",
    alt: "Monet-Waves",
    author: "Claude Monet",
  },
];

const picassoImages = [
  {
    img: "stilbilder/Picasso/Picasso-Guernica-Detail.jpg",
    title: "Guernica, 1937",
    alt: "Picasso-Guernica",
    author: "Pablo Picasso",
  },
  {
    img: "stilbilder/Picasso/the-old-guitarist.jpg",
    title: "The old blind Guitarist, 1903",
    alt: "Picasso-Guitarist",
    author: "Pablo Picasso",
  },
  {
    img: "stilbilder/Picasso/The-Weeping-Woman.jpg",
    title: "The Weeping Woman, 1937",
    alt: "Picasso-Weeping",
    author: "Pablo Picasso",
  },
];

const vanGoghImages = [
  {
    img: "stilbilder/Van Gogh/starry_night.jpg",
    title: "Starry Night, 1889",
    author: "Vincent van Gogh",
  },

  {
    img: "stilbilder/Van Gogh/the-starry-night-painting.jpg",
    title: "Starry Night on the Rhone, 1888",
    author: "Vincent van Gogh",
  },
];

const mackeImages = [
  {
    img: "stilbilder/Macke/August_Macke_Leute_die_sich_begegnen.jpg",
    title: "Leute, die sich begegnen, 1914",
    author: "August Mack",
  },

  {
    img: "stilbilder/Macke/Macke_farbige-formen-ii.jpg",
    title: "Farbige Formen II, 1913",
    author: "August Mack",
  },
];

const braqueImages = [
  {
    img: "stilbilder/Braque/head-of-a-woman-by-Georges-Braque.jpg",
    title: "Head of a Woman, 1909",
    author: "Georges Braque",
  },
  {
    img: "stilbilder/Braque/landscape-of-estaque-1907.jpg",
    title: "Landscape of Estaque, 1907",
    author: "Georges Braque",
  },
  {
    img: "stilbilder/Braque/violin-and-jug-1910-by-Georges-Braque.jpg",
    title: "Violin and jug, 1910",
    author: "Georges Braque",
  },
  {
    img: "stilbilder/Braque/violin-and-sheet-music-on-a-table-petit-oiseau-by-Georges-Braque.jpg",
    title: "Violin and Sheet Music on a Table, 1913",
    author: "Georges Braque",
  },
];

const variousImages = [
  {
    img: "stilbilder/die-große-welle-von-kanagawa.jpg",
    title: "Die große Welle von Kanagawa, 1830-1832",
    author: "Katsushika Hokusai",
  },
  {
    img: "stilbilder/Edvard_Munch_1893_The_Scream.jpg",
    title: "Der Schrei, 1893",
    author: "Edvard Munch",
  },
  {
    img: "stilbilder/mural.jpg",
    title: "Mural, 1943",
    author: "Jackson Pollock",
  },
  {
    img: "stilbilder/number-8-detail1.jpg",
    title: "Nummer 8, 1949",
    author: "Jackson Pollock",
  },
  {
    img: "stilbilder/Vassily_Kandinsky,_1913_-_Composition_7.jpg",
    title: "Composition 7, 1913",
    author: "Wassily Kandinsky",
  },
  {
    img: "stilbilder/Watersnakes_II_Gustav_Klimt.jpg",
    title: "Watersnakes II, 1907",
    author: "Gustav Klimt",
  },
];
