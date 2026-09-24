
const pagination = (model, page, limit, populate = [],findBy={}) => {
      const filter = findBy ?  findBy : {};
      const options = {
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 5,
            populate 
      }

      return model.paginate(filter, options);
}

export default pagination;