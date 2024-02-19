import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";

export default function TitlebarImageList() {
  return (
    <ImageList sx={{ width: "100vw", height: "60vh" }}>
      <ImageListItem key="Subheader1" cols={2}>
        <ListSubheader
          component="div"
          sx={{ backgroundColor: "black", color: "green" }}
        >
          Claude Monet
        </ListSubheader>
      </ImageListItem>
      {monetImages.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar title={item.title} subtitle={item.author} />
        </ImageListItem>
      ))}
      <ImageListItem key="Subheader2" cols={2}>
        <ListSubheader
          component="div"
          sx={{ backgroundColor: "black", color: "green" }}
        >
          Pablo Picasso
        </ListSubheader>
      </ImageListItem>
      {picassoImages.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar title={item.title} subtitle={item.author} />
        </ImageListItem>
      ))}
      <ImageListItem key="Subheader3" cols={2}>
        <ListSubheader
          component="div"
          sx={{ backgroundColor: "black", color: "green" }}
        >
          Vincent van Gogh
        </ListSubheader>
      </ImageListItem>
      {vanGoghImages.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar title={item.title} subtitle={item.author} />
        </ImageListItem>
      ))}
      <ImageListItem key="Subheader4" cols={2}>
        <ListSubheader
          component="div"
          sx={{ backgroundColor: "black", color: "green" }}
        >
          Verschiedenes
        </ListSubheader>
      </ImageListItem>
      {variousImages.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar title={item.title} subtitle={item.author} />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const monetImages = [
  {
    img: "stilbilder/Claude Monet/CLAUDE-MONET_SEEROSEN_CC-BY-SA_BSTGS_14562.jpg",
    title: "Seerosen, 1915",
    author: "Claude Monet",
  },
  {
    img: "stilbilder/Claude Monet/Claude_Monet_-_Grainstack,_Sun_in_the_Mist_-_Google_Art_Project.jpg",
    title: "Sun in the Mist",
    author: "Claude Monet",
  },
  {
    img: "stilbilder/Claude Monet/Marine_View_with_a_Sunset,_by_Claude_Monet.jpg",
    title: "Marine View with a Sunset",
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
    img: "stilbilder/Picasso/800px-Vincent_Willem_van_Gogh_127.jpg",
    title: "Sonnenblumen",
    author: "Vincent van Gogh",
  },
  {
    img: "stilbilder/Picasso/starry_night.jpg",
    title: "Starry Night",
    author: "Vincent van Gogh",
  },
  {
    img: "stilbilder/Picasso/the-starry-night-painting.jpg",
    title: "The starry night",
    author: "Vincent van Gogh",
  },
  {
    img: "stilbilder/Picasso/vangoghmuseum-s0016V1962-800.jpg",
    title: "Selbstprotrait",
    author: "Vincent van Gogh",
  },
  {
    img: "stilbilder/Picasso/vangoghmuseum-s0051V1962-800.jpg",
    title: "Selbstprotrait",
    author: "Vincent van Gogh",
  },
  {
    img: "stilbilder/Picasso/vangoghmuseum-s0083V1962-800.jpg",
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
