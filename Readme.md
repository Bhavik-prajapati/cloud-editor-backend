logger.info(`POST /api/users - New user data: ${JSON.stringify(req.body)}`);
logger.info('GET /api/users - Fetch all users');
return success(res, "Fetched All Users", { users });        
return error(res, "Signup failed", 500);


