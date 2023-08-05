const enums = require('../utils/enums');
const { DepositImageModel } = require("../database");

class DepositImageRepository {
  constructor(logRepository) {
    this.log = logRepository;
    this.model = DepositImageModel;
  }

 b64toBlob = (b64Data, contentType='', sliceSize=512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

  async create(request) {
    try {
      const blobImage = this.b64toBlob(request.image, 'image/jpeg');
      var blobToSave = Buffer.from(await blobImage.arrayBuffer());

      return this.model.create({
        depositId : request.depositId,
        image : blobToSave
      });
    }
    catch (error) {
      this.log.create('Error in create: '+error, enums.logsType.database);
    }
    return null;
  }

  async delete(request) {
    try {
        return this.model.delete(request);
    }
    catch (error) {
      this.log.create('Error in create: '+error, enums.logsType.database);
    }
    return null;
  }

  async get(id) {
    try {
      return this.model.findOne({
        where: {id: id},
      });
    }
    catch (error) {
      this.log.create('Error in get: '+error, enums.logsType.database);
    }
  }

  async getByDeposit(depositId) {
    try {
      return await this.model.findAll({
        where: {depositId: depositId}
      });
    }
    catch (error) {
      this.log.create('Error in getByDeposit: '+error, enums.logsType.database);
    }

    return null;
  }
}

module.exports = DepositImageRepository;