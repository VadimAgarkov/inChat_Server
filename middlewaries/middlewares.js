export async function requestTime(req, res, next) {
  req.requestTime = Date.now();
  next();
};

export function logger(req, res, next) {

}
