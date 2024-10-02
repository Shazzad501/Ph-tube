const loadCategories = () =>{
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(err => console.log(err))
}


const displayCategories = (categories) => {
  const categoryContainer = document.getElementById('category-container');
  categories.forEach(item => {
    const button = document.createElement('button');
    button.classList = 'btn';
    button.innerText = item.category
    categoryContainer.appendChild(button)
  });
}

loadCategories();