const asyncHandler = (fn) => (request, response, next) => { 
  return Promise.resolve(fn(request, response, next)).catch((error) => {    
    response.render('error', { error });
  });
};

module.exports = asyncHandler;
