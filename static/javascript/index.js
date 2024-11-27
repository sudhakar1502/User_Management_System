
const localUrl='http://localhost:2000'
const form=document.querySelector(".adduser");

form.onsubmit=async (e)=>{
    e.preventDefault();
    const form=new FormData(e.target);
    const entries=Object.fromEntries(form.entries());
    
    console.log(JSON.stringify(entries));
    try{
        const response=await fetch(`${localUrl}/api/users`,{headers:{"Content-Type":"application/json"},method:"POST",body:JSON.stringify(entries)});
        if(response.ok)
        {
            const data=await response.json();
            console.log(data);
            return data;
        }

    }
    catch(err)
    {
        console.log("error")
    }
 
}