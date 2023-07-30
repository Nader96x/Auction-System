module.exports.success = (data,attrs) =>{
  const response = {
    status: "success",
    data
  }
    if(attrs){
        Object.assign(response,attrs);
    }
    return response;
}
