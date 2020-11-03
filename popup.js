
 
 
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();


  async function getURL(){
    return firebase.database().ref().child('enlace').once('value').then(function(snapshot) {
        
        return Object.keys(snapshot.val()).map(function(key){ return snapshot.val()[key] });
            
      });
  }

document.addEventListener('DOMContentLoaded', async () => {
    const linksList = document.getElementById('linksList');
    
    try {
       
        const videos = await getURL()
        const videosHTML = videos
            .map((video) => {
                
                const videoUrl = video.url;
                return `<li class="video-link">
                        <button class="btn" data-url="${videoUrl}">Copy URL</button>
                        <a class="btn" href="${videoUrl}" rel="noopener noreferrer" target="_blank">Watch</a>
                     ${video.titulo}
                    </li>`;
            })
            .join('');
        linksList.innerHTML = videosHTML;
        const videoLinks = [...document.querySelectorAll('.video-link')];
        videoLinks.forEach((link) => link.addEventListener('click', copy));
    } catch (err) {
        console.error(err);
    }
});
