const queryBuilder = async(req,model=null) => {

  var data = req.query;

  var { page, limit,like } = data;
  var filter = {
    options:{},
    criteria:{}
  };
  if(page) delete data.page;
  if(limit) delete data.limit;
  if(like) delete data.like;
  //
  if(page && limit)
  {
      filter.options.offset = (page==1 ? 0 : (page-1)*limit);
      filter.options.limit =  limit;
  }

  console.log(filter);

  if(page && limit) {
    // var count = await cloned.count(filter.criteria);
  };


  return filter;

};

module.exports = {
    queryBuilder
}
