import { useEffect, useState } from 'react'
import axios from 'axios'


// {
//   "id": "1",
//   "from": {
//     "email": "bounced@flipkart.com",
//     "name": "bounced"
//   },
//   "date": 1582729505000,
//   "subject": "Lorem Ipsum",
//   "short_description": "Vestibulum sit amet ipsum aliquet, lacinia nulla malesuada, ullamcorper massa",
//    is_favourite : false
//    is_read : false,
// }

function App() {
  const [emailList,setEmailList] = useState([])
  const [filterState,setFilterState] = useState("all")
  const [clickedId,setClickedId]=useState("")
  const filterIdList = ["all","read","unread","favorite"]
  const emailListURL = 'https://flipkart-email-mock.vercel.app/?page=1';
  const loremIpsumPara1= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.";
  const loremIpsumPara2="Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.";
  const loremIpsumPara3="Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.";

  // console.log(emailListURL.toString());

  // set the styling for the filter clicked
  function filterIds(){
      document.querySelector('.email-body').style.display='none';
      // document.querySelector('.email-body').style.width='0';
        // document.querySelector('.email-listing-body').style.display='none';
      console.log("in filter")
      filterIdList.map((currentFilter)=>{
        console.log(currentFilter)
        if(currentFilter===filterState){
          document.getElementById(filterState).style.backgroundColor="#E1E4EA";
          document.getElementById(filterState).style.border='solid #CFD2DC';
          document.getElementById(filterState).style.borderWidth='1px';
        }
        else{
          document.getElementById(currentFilter).style.backgroundColor='transparent';
      document.getElementById(currentFilter).style.border='transparent';
      document.getElementById(currentFilter).style.borderWidth='0';
        }
      })
}
  
  
 function displayEmailBody(){
    emailList.map((currentEmail)=>{
      if(currentEmail.id === clickedId){
        console.log(clickedId);
        document.getElementById("email-description").innerHTML="";
        
        // set the email description, here not available so I just put lorem ipsum text 
        document.getElementById("email-description").innerHTML+=`<p>${loremIpsumPara1}</p>`;
        document.getElementById("email-description").innerHTML+=`<p>${loremIpsumPara2}</p>`;
        document.getElementById("email-description").innerHTML+=`<p>${loremIpsumPara3}</p>`;
        console.log(document.getElementById("email-description").innerText);

        document.querySelector('.email-body-container1').innerText=currentEmail.from.name[0];
        
        document.querySelector('.emailBody-subject').innerText=currentEmail.subject;

        document.querySelector('.emailBody-date').innerText=currentEmail.date;

        document.querySelector('.email-body').style.display='block';
        document.querySelector('.email-listing-body').style.display='flex';
      }
    })
  }

  useEffect(()=>{
    async function getEmailList(){
      try {
        // setEmailList([]);
        const emailListAPI = await axios.get(emailListURL);
        const emailDataList = [...emailListAPI.data.list];
        // setEmailList([...emailDataList])
        const updatedEmailList = emailDataList.map((email)=>{
          const newEmail = {
            date : email.date,
            from : email.from,
            id : email.id,
            short_description : email.short_description,
            subject : email.subject,
            is_favorite:false,
            is_read:false
          }
          return newEmail;
        })
        setEmailList([...updatedEmailList])
      } catch (error) { 
      }
    }
    // console.log(emailList);
    // filterIds();
    // displayEmailBody();
    getEmailList();
    console.log(JSON.stringify(emailList,null,2));
    // setTimeout(displayEmailBody,0);
    
    if(clickedId!="")
      displayEmailBody();
    else
      filterIds();
    },[filterState,clickedId]);
  
  return (
    <div className="container">
      <div className='nav'>
        <span className='filter-by'>Filter By:</span>
        <span className='filter' id='all' onClick={(e)=>{setFilterState(e.target.id); setClickedId("");}}>All</span>
        <span className='filter' id='read' onClick={(e)=>{setFilterState(e.target.id); setClickedId("");}}>Read</span>
        <span className='filter' id='unread' onClick={(e)=>{setFilterState(e.target.id); setClickedId("");}}>Unread</span>
        <span className='filter' id='favorite' onClick={(e)=>{setFilterState(e.target.id); setClickedId("");}}>Favorites</span>
      </div>
      <div className='email-listing-body'> 
      <div className='email-list'>
        {
          // check if filterState to all , it is by default
          (filterState==="all")?
          (
            emailList.map((emailData)=>{
              return(
                  <div key = {emailData.id} className='emailData-container'>
                    <div className='emailData-container1'>
                      {emailData.from.name[0]}
                    </div>
                    <a  href="#" className='emailData-container2' onClick={()=>{setClickedId(`${emailData.id}`); return false;}}>
                      <div>From: <b>{emailData.from.name} {emailData.from.email}</b></div>
                      <div>Subject: <b>{emailData.subject}</b></div>
                      <div>{emailData.short_description}</div>
                      <div>{emailData.date}</div>
                    </a>
                  </div>
              )
            })
          ):(
            // check if filter state is displayed to read, display only read emails
            (filterState==="read")?(
              emailList.map((emailData)=>{
                if(emailData.is_read===true){
                return(
                    <div className='emailData-container'>
                      <div className='emailData-container1'>
                        {emailData.from.name[0]}
                      </div>
                      <a href="" className='emailData-container2' onClick={()=>{setClickedId(emailData.id)}}>
                        <div>From: <b>{emailData.from.name} {emailData.from.email}</b></div>
                        <div>Subject: <b>{emailData.subject}</b></div>
                        <div>{emailData.short_description}</div>
                        <div>{emailData.date}</div>
                      </a>
                    </div>
                )
                }
              })
            ):(
              // check if filter state is displayed to unread, display only unread emails
              (filterState==="unread")?(
              emailList.map((emailData)=>{
                if(emailData.is_read===false){
                return(
                    <div className='emailData-container'>
                      <div className='emailData-container1'>
                        {emailData.from.name[0]}
                      </div>
                      <a href="" className='emailData-container2' onClick={()=>{setClickedId(emailData.id)}}>
                        <div>From: <b>{emailData.from.name} {emailData.from.email}</b></div>
                        <div>Subject: <b>{emailData.subject}</b></div>
                        <div>{emailData.short_description}</div>
                        <div>{emailData.date}</div>
                      </a>
                    </div>
                )
                }
              })
            ):(
              // check if filter state is displayed to favorite, display only favorite emails
              (filterState==="favorite")?(
              emailList.map((emailData)=>{
                if(emailData.is_favorite===true){
                return(
                    <div className='emailData-container'>
                      <div className='emailData-container1'>
                        {emailData.from.name[0]}
                      </div>
                      <a href="" className='emailData-container2' onClick={()=>{setClickedId(emailData.id)}}>
                        <div>From: <b>{emailData.from.name} {emailData.from.email}</b></div>
                        <div>Subject: <b>{emailData.subject}</b></div>
                        <div>{emailData.short_description}</div>
                        <div>{emailData.date}</div>
                      </a>
                    </div>
                )
                }
              })
            ):(<></>)))
          )
        }
      </div>

      <div className='email-body'>
      <div className='email-body-container1'></div>

        <div className='email-body-container2'>
          <div className='emailBody-header'>
            <b><span className='emailBody-subject'></span></b>
            <button className='fav'>Mark as favorite</button>
          </div>

          <div className='emailBody-date'></div>

          <div id='email-description'></div>

        </div>

      </div>
      </div>
    </div>
  )
}

export default App
