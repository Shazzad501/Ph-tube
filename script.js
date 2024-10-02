const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((err) => console.log(err));
};
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((err) => console.log(err));
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categories.forEach((item) => {
    const button = document.createElement("button");
    button.classList = "btn font-bold text-base";
    button.innerText = item?.category;
    categoryContainer.appendChild(button);
  });
};

const videoObject ={
  "category_id": "1001",
  "video_id": "aaaa",
  "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
  "title": "Shape of You",
  "authors": [
      {
          "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
          "profile_name": "Olivia Mitchell",
          "verified": ""
      }
  ],
  "others": {
      "views": "100K",
      "posted_date": "16278"
  },
  "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video");
  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement('div');
    card.classList="card card-compact rounded-t-lg"
    card.innerHTML = `
      <figure class="h-[200px]">
        <img
        class="w-full h-full object-cover rounded-lg"
          src=${video?.thumbnail}
          alt="" />
      </figure>
      <div class="px-0 py-4 flex gap-3">
        <div>
          <img class=" w-10 h-10 rounded-full object-cover" src="${video?.authors[0]?.profile_picture}"/>
        </div>
        <div>
          <h2 class="font-bold test-lg">${video?.title}</h2>
          <div class="flex gap-2 items-center">
            <p class="text-gray-500 text-base">${video?.authors[0]?.profile_name}</p>
            <img class="w-5" url="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>
          </div>
          <p></p>
        </div>
      </div>
    `
    videoContainer.append(card)
  });
};

loadCategories();
loadVideos();
