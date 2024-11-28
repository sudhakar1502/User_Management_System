
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
    }
    else if(window.location.pathname=="/add-user")
    {
        form.onsubmit=async (e)=>{
            e.preventDefault();
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
}
