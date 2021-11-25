const $search = document.getElementById('search'),
      $form = document.getElementById('form'),
      $lightMode = document.querySelector('.lightmode');
      $body = document.querySelector('body');

$lightMode.addEventListener('click', function(){
   if($body.classList.contains('light')) {
      $body.classList.remove('light');
      $lightMode.innerHTML = `
      <p>Light</p>
      <img src="img/sun.svg" alt="light">
      `
   } else {
      $body.classList.add('light')
      $lightMode.innerHTML = `
      <p>Dark</p>
      <img src="img/moon.svg" alt="dark">
      `
   }
})

$form.addEventListener('submit', function(e) {
   e.preventDefault()
   let validName = $search.value.split(' ').join('');
   fetch('https://api.github.com/users/' + validName)
   .then((result) => result.json())
   .then((data) => {
      $search.value = null;
      const card = document.querySelector('.card');
      card.style.display = 'flex';
      card.innerHTML = `
      <div class="card__img">
               <img src="${data.avatar_url}" alt="profile">
            </div>
            <div class="card__info">
               <div class="info__top">
                  <div class="info__name">
                     ${data.name ? `<p class="name__name">${data.name}</p>` : `<p class="name__name" style="opacity:0.4;">No name</p>`}
                     <p class="name__tag">@${data.login}</p>
                  </div>
                  <p class="info__joined">Joined ${data.created_at.slice(0, -10)}</p>
               </div>
               ${data.bio ? `<p class="info__bio">${data.bio}</p>` : `<p class="info__bio" style="opacity:0.4;">Empty bio</p>`}
               <div class="info__data">
                  <div class="data__item">
                     <p>Following</p>
                     <p>${data.following}</p>
                  </div>
                  <div class="data__item">
                     <p>Followers</p>
                     <p>${data.followers}</p>
                  </div>
                  <div class="data__item">
                     <p>Repositories</p>
                     <p>${data.public_repos}</p>
                  </div>
               </div>
               <div class="info__links">
                  <div class="links__link">                     
                     ${data.location ? `<img src="img/loc.svg" alt="location"><p>${data.location}</p>` :
                      `<img src="img/loc.svg" style="opacity:0.4; alt="location"><p style="opacity:0.4;">Not available</p>`}
                  </div>
                  <div class="links__link">
                     ${data.twitter_url ? `<img src="img/twitter.svg" alt="location"><a href="${data.twitter_url}">${data.twitter_url}</a>` :
                      `<img src="img/twitter.svg" style="opacity:0.4; alt="location"><p style="opacity:0.4;">Not available</p>`}
                  </div>
                  <div class="links__link">
                     ${data.blog ? `<img src="img/link.svg" alt="location"><a href="${data.blog}" target="_blank">${data.blog}</a>` :
                      `<img src="img/link.svg" <img src="img/link.svg" style="opacity:0.4; alt="location"><p style="opacity:0.4;">Not available</p>`}
                  </div>
                  <div class="links__link">
                     ${data.company ? `<img src="img/company.svg" alt="location"><p>${data.company}</p>` :
                      `<img src="img/company.svg" style="opacity:0.4; alt="location"><p style="opacity:0.4;">Not available</p>`}
                  </div>
               </div>
            </div>`
   })
})


