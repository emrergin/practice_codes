methods.MKCOL = async function(request) {
    let stats;
      
    try{
      let path = urlPath(request.url);
      stats = await stat(path);
      if (!stats.isDirectory()) throw error;
      await mkdir(path);
      return {status: 204};
    }
    catch(error){
      if (error.code == "EEXIST") {return {status: 204};}
      if (error.code == "ENOENT") {return {status: 400, body: "Not a directory"};}
      else{console.log(error);}
    }
  
  };