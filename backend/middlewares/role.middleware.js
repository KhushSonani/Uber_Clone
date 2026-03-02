
export const allowCaptainOnly = (req,res,next) => {
    if(!req.user){
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    if(req.user.role !== "driver"){
        return res.status(403).json({
            message: "Access denied! Captains Only."
        });
    }
    next();
};

export const allowRiderOnly = (req,res,next) => {
    if(!req.user){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    if(req.user.role !== "rider"){
        return res.status(403).json({
            message: "Access denied! Riders Only."
        });
    }
    next();
};