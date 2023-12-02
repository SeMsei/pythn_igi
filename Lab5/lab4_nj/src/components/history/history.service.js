import Response from '../../utils/response.js';
import History from './history.entities.js';

class HistoryService {
    constructor() {
      this.books = [];
    }
  
    addHistory = async (history) => {
        if (history.year == null || history.description == null)
            return new Response(null, 400, "History fields cannot be null");

        const historys = await History.find({});

        if (historys.length == 0)
            history.id = 0;
        else
            history.id = historys[historys.length - 1].id + 1;
        await history.save();
        return new Response(history, 201, "Create Successfull");
    };
  
    getHistorys = async (sort) => {
      var historys = await History.find({}, 'id description year');
      console.log(historys);

      if (sort != null) {
        if (sort == 'asc') {
            historys.sort((a,b) => {
            if ( a.year > b.year ){
              return 1;
            }
            if ( a.year < b.year ){
              return -1;
            }
            return 0;
          });
        } else if (sort == 'desc') {
            historys.sort((a,b) => {
            if ( a.year > b.year ){
              return -1;
            }
            if ( a.year < b.year ){
              return 1;
            }
            return 0;
          });
        }
      }

      return new Response(historys, 200, "Get Successfull");
    }
  
    getHistory = async (id) => {
      const history = await History.findOne({id: id}, 'id description year');

      if (history == null) {
        return new Response(null, 400, "No such history");
      }

      return new Response(history, 200, "Get successfull");
    };

    putHistory = async (id, history) => {
      const _history = await History.findOne({id: id}, 'id description year');

      if (_history == null) {
        return new Response(null, 400, "No such history");
      }

      if (history.description == null || history.year == null)
        return new Response(null, 400, "history fields cannot be null");

      const ret = await History.findOneAndUpdate({id: id}, {description: history.description, year: history.year}, {new: true});

      return new Response(ret, 200, "Put successfull");
    };

    deleteHistory = async (id) => {
      const _history = await History.findOne({id: id});

      if (_history == null)
        return new Response(null, 400, "No such history");

      await History.findOneAndDelete({id: id});

      return new Response(_history, 200, "Delete successfull");
    }
  }
  
  export default HistoryService;