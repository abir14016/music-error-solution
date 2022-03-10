const elementById = (id) => {
  return document.getElementById(id);
};

const handleSearch = () => {
  const keyword = elementById("keyword");
  const artistContainer = elementById("artists");
  const albumContainer = elementById("albums");
  // console.log(keyword);
  const url = `https://theaudiodb.com/api/v1/json/2/search.php?s=${keyword.value}`;
  keyword.value = "";
  artistContainer.textContent = "";
  albumContainer.textContent = "";
  fetch(url)
    .then((res) => res.json())
    .then((data) => showArtists(data));
};

const showArtists = (data) => {
  // console.log(data.artists);
  const artistContainer = elementById("artists");
  artistContainer.textContent = "";
  data?.artists?.forEach((artist) => {
    // console.log(artist);
    const div = document.createElement("div");
    div.classList.add("artist-card");
    div.innerHTML = `<div class="image-container">
    <div class="image-container-inner">
      <img
        src="${artist.strArtistThumb ? artist.strArtistThumb : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}"
        alt=""
      />
    </div>
  </div>
  <div class="info-container">
    <h1>${artist.strArtist ? artist.strArtist : "Not avialable"}</h1>
    <p>Country: ${artist.strCountry ? artist.strCountry : "Not avialable"}</p>
    <p>Style: ${artist.strGenre ? artist.strGenre : "Not avialable"}</p>
  </div>
  <button class="album-button">
    <i class="fa-solid fa-compact-disc"></i>
    <p onclick="fetchAlbums('${artist.idArtist}')" class="button-title">Albums</p>
  </button>`;
    artistContainer.appendChild(div);
  });
};

const fetchAlbums = (id) => {
  const url = `https://theaudiodb.com/api/v1/json/2/album.php?i=${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showAlbum(data));
  const artistContainer = elementById("artists");
  artistContainer.innerHTML = "";
};

const showAlbum = (data) => {
  // console.log(data.album);
  const albumContainer = elementById("albums");
  albumContainer.textContent = "";
  data.album.forEach((item) => {
    // console.log(item);
    const div = document.createElement("div");
    div.classList.add("album");
    div.innerHTML = `
        <div class="album-image-container">
          <img
            src="${item.strAlbumThumb ? item.strAlbumThumb : "https://zerojackerzz.com/wp-content/uploads/2019/10/album-placeholder.png"}"
            alt=""
          />
        </div>
        <div class="album-name">
          <h3>${item.strAlbum}</h3>
        </div>
      `;

    albumContainer.appendChild(div);
  });
};