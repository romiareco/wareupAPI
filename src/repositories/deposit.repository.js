const enums = require('../utils/enums');
const Sequelize = require('sequelize');
const { DepositModel, CityModel, CompanyModel, ServiceModel, DepartmentModel } = require("../database"); 
const DepositServiceModel = require('../models/depositService.model');

class DepositRepository {
  constructor(logRepository){
    this.log = logRepository;
    this.model = DepositModel;
  }

  async create(request){
    try { 
        return this.model.create(request);
    }
    catch (error) {
      this.log.create('Error in create: '+error, enums.logsType.database);
    }
    return null;
  }

  async update(request) {
    try { 
        return this.model.update(
          { 
            status: request.status,
            title: request.title,
            description: request.description,
            totalM3: request.totalM3,
            currency: request.currency,
            cityId: request.cityId,
            minimumBusinessPeriod: request.minimumBusinessPeriod ,
            minimumBusinessVolume: request.minimumBusinessVolume,
            expectedPrice: request.expectedPrice,
            street: request.street,
            postalCode: request.postalCode
          },
          {
            where: { id : request.id}
          });
    }
    catch (error) {
      this.log.create('Error in update: '+ error, enums.logsType.database);
    }
    return null;
  }

  async get(id){
    try {
      return this.model.findOne({
        where: {id: id},
        include: [CompanyModel,
          {
            model: CityModel,
            include: [DepartmentModel]
          }, DepositServiceModel]
      });
    }
    catch (error) {
      this.log.create('Error in get: '+error, enums.logsType.database);
    }
    return null;
  }

  hasFilters(d, servicesId){
    var hasFilter = true;
    servicesId.forEach(s=> {
      hasFilter = hasFilter && d.depositServices.filter(ds => ds.serviceId == s).length > 0;
    });
    return hasFilter;
  }

  async getByCompany(companyId) {
    try {
      return await this.model.findAll({
        where: {companyId: companyId},
        include: [CompanyModel,
          {
            model: CityModel,
            include: [DepartmentModel]
          }, DepositServiceModel]
      });
    }
    catch (error) {
      this.log.create('Error in getByCompany: '+error, enums.logsType.database);
    }

    return null;
  }

  onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
  }

  async getByFilter(filterOptions) {
    try {

      var filterAll = await this.model.findAll({
        include: [CompanyModel,
          {
            model: DepositServiceModel,
            //where: { serviceId: filterOptions.servicesId },
            include: [ServiceModel]
          },
          {
            model: CityModel,
            include: [DepartmentModel]
          }] 
      }).then(deposits => deposits.filter(deposit => filterOptions.city == null || (deposit.city != null && 
        (
          (deposit.city.title.includes(filterOptions.city) || 
          (deposit.city.department != null && deposit.city.department.title.includes(filterOptions.city))
          )
        ))));

        if(filterOptions.applyFilter && !!filterOptions.servicesId){
          filterAll = filterAll.filter(d=> this.hasFilters(d, filterOptions.servicesId.split(',')));
        } 
        if(filterOptions.applyFilter && !!filterOptions.fromTotalM3){
          filterAll = filterAll.filter(d=> d.totalM3 >= filterOptions.fromTotalM3);
        } 
        if(filterOptions.applyFilter && !!filterOptions.toTotalM3){
          filterAll = filterAll.filter(d=> d.totalM3 <= filterOptions.toTotalM3);
        } 
        if(filterOptions.applyFilter && !!filterOptions.minimumBusinessPeriod){
          filterAll = filterAll.filter(d=> d.minimumBusinessPeriod <= filterOptions.minimumBusinessPeriod);
        }
        if(filterOptions.applyFilter && !!filterOptions.minimumBusinessVolume){
          filterAll = filterAll.filter(d=> d.minimumBusinessVolume <= filterOptions.minimumBusinessVolume);
        }  
        if(filterOptions.applyFilter && !!filterOptions.status){
          filterAll = filterAll.filter(d=> d.status >= filterOptions.status);
        }  
        return filterAll; 
    }
    catch (error) {
      this.log.create('Error in getByFilter: '+error, enums.logsType.database);
    }

    return null;
  }

  async getAll() {
    try {
      return await this.model.findAll({
        include: [CompanyModel,
          {
            model: CityModel,
            include: [DepartmentModel]
          }, DepositServiceModel]});
    }
    catch (error) {
      this.log.create('Error in getAll: '+error, enums.logsType.database);
    }

    return null;
  }

  async getByUser(userId) {
    try {
      return await this.model.findAll({
        where: {userId: userId},
        include: [CompanyModel, {model: CityModel, include: [DepartmentModel]}, DepositServiceModel]
      });
    }
    catch (error) {
      this.log.create('Error in getByUser: '+error, enums.logsType.database);
    }

    return null;
  }

}

module.exports = DepositRepository;