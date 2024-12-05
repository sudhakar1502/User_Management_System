
const localUrl='http://localhost:2000'
const form=document.querySelector(".adduser");



window.onload=async(e)=>{

    e.preventDefault();
    if(window.location.pathname=="/")
    {
       const response=await fetch(`${localUrl}/api/users/fetchusers`,{method:'GET'});

       try
       {
        if(response.ok)
        {
          const data=await response.json();
          console.log(data);
          return data;
        }
       }
       catch(error)
       {
          console.log(error);
       } 
       DeleteButton();
    }
    else if(window.location.pathname=="/add-user")
    {
        form.onsubmit=async (e)=>{
            e.preventDefault();
            Validation();
            const form=new FormData(e.target);
            const entries=Object.fromEntries(form.entries());
            const error=document.getElementById('errormessage');

            try{
                const response=await fetch(`${localUrl}/api/users/create`,{headers:{"Content-Type":"application/json"},
                    method:"POST",body:JSON.stringify(entries)});

                if(response.ok)
                {
                    const data=await response.json();
                    error.innerText=data.message;
                    return data;
                }

            }
            catch(err)
            {
                error.innerText=err;
            }
        }
    }
    else if(window.location.pathname=="/updateuser")
        {
            const email=window.location.search.toString().split('=')[1];
            form.onsubmit=async (e)=>{
                e.preventDefault();
                Validation()
                const form=new FormData(e.target);
                const entries=Object.fromEntries(form.entries());
                const error=document.getElementById('errormessage');
                entries.email = email;
                try{
                    const response=await fetch(`${localUrl}/updateuser`,{headers:{"Content-Type":"application/json"},
                        method:"PUT",body:JSON.stringify(entries)});
    
                    if(response.ok)
                    {
                        const data=await response.json();
                        error.innerText=data.message;
                        console.log(data);
                        return data;
                    }
    
                }
                catch(err)
                {
                    error.innerText=err;
                }
            }
        }
        else if(window.location.pathname=="/")
            {
              
            }
}
SearchButton();
function SearchButton()
{
    const searchBtn=document.querySelector('.searchbtn');
    const searchInput=document.querySelector('.search');

    console.log(searchBtn);
    if(!searchInput || !searchBtn)return;
  
    searchBtn.addEventListener('click',async (e)=>{

        window.location.href=`${localUrl}/search/${searchInput.value}`
        // const response=await fetch(`${localUrl}/search/${searchInput.innerText}`,{method:'GET'});
        // if(response.ok)
        // {
        //     const data=await response.json();
        //     console.log("data",data);
        //     return data;
        // }
        // console.log("Reponse not ok!");
    });

}

function DeleteButton(){
    const deleteBtn=document.querySelectorAll('#deleteBtn');
    console.log(deleteBtn);

    if(!deleteBtn)
        return;

    for(let btn of deleteBtn)
    {
        btn.onclick=async (e)=>{
            const email=btn.getAttribute('data-email');
    
            console.log('email',email);
               try{
                        const response=await fetch(`${localUrl}/deleteuser?email=${email}`,{method:"DELETE"});
            
                        if(response.ok)
                        {
                            const data=await response.json();
                            if(data)
                            {
                                window.location.reload();
                            }
                            return data;
                        }
            
                    }
                    catch(err)
                    {
                        console.log(err);
                    }
    }
}}

function Validation()
{
    const name=document.querySelector('.name');
    const email=document.querySelector('.email');

    const gender=document.querySelector('.gender');
    const statusInputs = document.querySelectorAll('.status');

    const nameLabel=document.querySelector('.namelabel');
    const emailLabel=document.querySelector('.emaillabel');
    
    const statusError= document.querySelector('#errormessage');

    nameLabel.innerText="";
    emailLabel.innerText="";
    statusError.innerText = "";

    let statusSelected = false;
    statusInputs.forEach((input) => {
        if (input.checked) {
            statusSelected = true;
        }
    });

    if (!statusSelected) {
        statusError.innerText = "Please select your status!";
    }

    if (!name.value.trim()) {
        nameLabel.innerText = "Name is required!";
    }
    if (email && !email.value.trim()) {
        emailLabel.innerText = "Email is required!";
        return;
    }

}