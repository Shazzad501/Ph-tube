//fetch, load ,show categoris on html

function getTimeString(time) {
  const hour = parseInt(time / 3600);
  let remainingsecond = time % 3600;
  const minute = parseInt(remainingsecond / 60);
  remainingsecond = remainingsecond % 60;
  return `${hour}h ${minute}min ${remainingsecond}sec`;
}

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};
// creat loadcategories

const loadCategories = () => {
  //    fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const loadVideos = (searchText = "") => {
  //    fetch the data
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
};

const loadCategoryVideo = (id) => {
  // alert(id)
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // sobair class remove koro
      removeActiveClass();
      // id r class k add koro
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      console.log(activeBtn);
      displayVideos(data.category);
    })
    .catch((error) => console.log(error));
};

const loadDetails = async (videoID) => {
  console.log("la la al");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`
  );
  const data = await res.json();
  displayDetails(data.video);
};
const displayDetails = (video) => {
  console.log(video);
  const modalcontent = document.getElementById("modal-content");
  modalcontent.innerHTML = `<img src = ${video.thumbnail}/>
      <p>${video.description}</p>`;
  // way-1
  // document.getElementById('showmodaldata').click()
  // way-2
  document.getElementById("custommodal").showModal();
};

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";
  if (videos.length === 0) {
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `<div class ="min-h-[300px] flex flex-col justify-center items-center gap-5">
          <img src="images/Icon.png"/>
          <h2 class="text-xl font-bold text-center">No video in this category</h2>
          </div>`;
    return;
  } else {
    videoContainer.classList.add("grid");
  }
  videos.forEach((videoitem) => {
    console.log(videoitem);
    const card = document.createElement("div");
    card.classList = "card card-compact";
    card.innerHTML = `
      
<figure class="h-[200px] relative">
  <img class = "h-full w-full object-cover"
    src= ${videoitem.thumbnail}
    alt="Shoes" />
    ${
      videoitem.others.posted_date?.length === 0
        ? " "
        : `  <span class="absolute bottom-2 right-2 bg-black text-white rounded p-1">${getTimeString(
            videoitem.others.posted_date
          )}</span>`
    }
  
</figure>
<div class="px-0 py-2 flex gap-2">
 <div>
 <img class= "w-10 h-10 rounded-full object-cover" src=${
   videoitem.authors[0].profile_picture
 } />
 
 
 </div>
 <div>
 <h2 class ="font-bold">${videoitem.title}</h2>
 <div class ="flex items-center gap-2">
 <p class="text-gray-400 text-xs">${videoitem.authors[0].profile_name}</p>
${
  videoitem.authors[0].verified === true
    ? ` <img class= "w-5" src="images/verified.png" />`
    : " "
}
 </div>
 <p><button onclick="loadDetails('${
   videoitem.video_id
 }')" class="btn btn-sm btn-error"> details
 </button></p>
 
 
 </div>
</div>

          `;
    videoContainer.append(card);
  });
};

// create displaycategries

const displayCategories = (categories) => {
  const categoriesContainer = document.getElementById("categories");
  categories.forEach((item) => {
    console.log(item);

    // create button

    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = `<button id="btn-${item.category_id}" onclick="loadCategoryVideo(${item.category_id})" class ='btn category-btn'>${item.category} </button>`;
    // button.onclick = alert('hello')
    // add button to categori container

    categoriesContainer.append(buttonContainer);
  });
};
document.getElementById("search-input").addEventListener("keyup", (e) => {
  loadVideos(e.target.value);
});

loadCategories();
loadVideos();
