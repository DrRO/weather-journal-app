//By Rasha Omran

/* Global Variables */
// I define variable "weatherUrl" as a base url which refer to API OpenWeatherMap.com to return the weather according to ZIP CODE of country 
let weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?zip=';


// I define my spesific API which I get from my account on OpenWeatherMap.com
let keyOfApi = '&appid=3a3895d7230b8d1f274210e2b0e2062a';

// Create a new date instance dynamically with JS
let d = new Date();

//formating of date "mm dd yyyy"
let newDate ='Date:  '  +d.getMonth() +'/'+ d.getDate()+'/'+ d.getFullYear();



//I add function to generate button which at UI of html file
document.getElementById('generate').addEventListener('click',generateForcast);
// callback function to execute when generate button is clicked.
function generateForcast(e){
  var zipCode = document.getElementById('zip').value;
//  I call  async GET request
//I passing the  URL which consisits of (weatherUrl ,zipCode and keyOfApi )according to zip code in getData method
  getData(weatherUrl
    ,zipCode
    ,keyOfApi )
  .then (function(data) {
      //I use post function to add the data to post request
     
      postFunction('/addData' ,{date:newDate,
        temp:'Tempreture:  '+ data.list[0].main.temp_max + ' °',
         content: 'Feelings:  '+ document.getElementById('feelings').value} )
     
  })
  .then( updateUI()  // update user interferance screen
    )
  
  };

   


//I create function to get data from API
const getData = async(weatherUrl,zip,keyOfApi) =>{

  //full URL >>>  api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}
  var fullURL = weatherUrl+zip+keyOfApi 
  // fetch the url to get API data
  const res = await fetch(fullURL)
  try{   //I use try to tested for errors while it is being executed
  
      const data = await res.json();
      return data;

  }catch(error){   // use catch if an error occurs in the try block

console.log("Something went wrong.", error);
  }
}


    //post data

 /* Function to POST data */
const postFunction = async (url='' , data={})=>{
   
    const response = await fetch(url , {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json',},

      // convert javascript object to json string
      body: JSON.stringify(data)
    });
  
    try {
      const userEntry = await response.json();
      return userEntry;
    }
    catch (error) {
        console.log("Something went wrong.", error);
    }
  }


  const updateUI = async () => {
    const request = await fetch('/allData');
    try {
      const allData = await request.json()
    
      // get the result of weather forecast on screen by access the value of DOM elements by selecting them 
      //get date
      document.getElementById('date').innerHTML = allData[0].date;
      //get tempereture
      document.getElementById('temp').innerHTML = allData[0].temp;
      //get feelings content or user response
      document.getElementById('content').innerHTML = allData[0].content;
    }
    catch (error) {
      console.log("Something went wrong.", error);
    }
  }

