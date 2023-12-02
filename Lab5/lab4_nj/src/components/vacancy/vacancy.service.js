import Response from '../../utils/response.js';
import Vacancy from './vacancy.entities.js';

class VacancyService {
    constructor() {
      this.books = [];
    }
  
    addVacancy = async (vacancy) => {
        if (vacancy.title == null || vacancy.description == null || vacancy.salary == null)
            return new Response(null, 400, "Vacancy fields cannot be null");

        const vacancys = await Vacancy.find({});

        if (vacancys.length == 0)
            vacancy.id = 0;
        else
            vacancy.id = vacancys[vacancys.length - 1].id + 1;
        await vacancy.save();
        return new Response(vacancy, 201, "Create Successfull");
    };
  
    getVacancys = async (sort, find) => {
      var vacancys = await Vacancy.find({}, 'id title description salary');
      console.log(vacancys);

      if (sort != null) {
        if (sort == 'asc') {
            vacancys.sort((a,b) => {
            if ( a.salary > b.salary ){
              return 1;
            }
            if ( a.salary < b.salary ){
              return -1;
            }
            return 0;
          });
        } else if (sort == 'desc') {
            vacancys.sort((a,b) => {
            if ( a.salary > b.salary ){
              return -1;
            }
            if ( a.salary < b.salary ){
              return 1;
            }
            return 0;
          });
        }
      }

      if (find != null) {
        vacancys = vacancys.filter((vacancy) => vacancy.title.startsWith(find));
      }

      return new Response(vacancys, 200, "Get Successfull");
    }
  
    getVacancy = async (id) => {
      const vacancy = await Vacancy.findOne({id: id}, 'id title description salary');

      if (vacancy == null) {
        return new Response(null, 400, "No such vacancy");
      }

      return new Response(vacancy, 200, "Get successfull");
    };

    putVacancy = async (id, vacancy) => {
      const _vacancy = await Vacancy.findOne({id: id}, 'id title description salary');

      if (_vacancy == null) {
        return new Response(null, 400, "No such vacancy");
      }

      if (vacancy.title == null || vacancy.description == null || vacancy.salary == null)
        return new Response(null, 400, "Vacancy fields cannot be null");

      const ret = await Vacancy.findOneAndUpdate({id: id}, {title: vacancy.title, description: vacancy.description, salary: vacancy.salary}, {new: true});

      return new Response(ret, 200, "Put successfull");
    };

    deleteVacancy = async (id) => {
      const _vacancy = await Vacancy.findOne({id: id});

      if (_vacancy == null)
        return new Response(null, 400, "No such vacancy");

      await Vacancy.findOneAndDelete({id: id});

      return new Response(_vacancy, 200, "Delete successfull");
    }
  }
  
  export default VacancyService;