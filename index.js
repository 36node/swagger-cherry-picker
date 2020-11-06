const SwaggerParser = require("@apidevtools/swagger-parser");
const fs = require("fs");
const lodash = require("lodash");
const yaml = require("json2yaml");

// const file = "./test.yml";
const file = "https://api.youyuan.36node.com/core/uat/openapi.yml";
const newFile = "./new.yml";

const operationIds = ["createPark", "listRepairs", "updateMaintain"];

const saveFile = (fileName, yml) => {
  fs.writeFile("./new.yml", yml, function (error) {
    if (error) {
      console.log("写入失败");
    } else {
      console.log("写入成功");
    }
  });
};

const cherryPick = (fileName, newFileName, ids) => {
  SwaggerParser.validate(fileName, (err, api) => {
    if (err) {
      console.error(err);
    } else {
      const ret = lodash.cloneDeep(api);
      // 通过paths获取所有url
      Object.keys(api.paths).forEach((url) => {
        var urlData = api.paths[url];
        var isNeed = false;

        // 遍历每个url的method，查看operationId是否符合要求
        Object.keys(urlData).forEach((method) => {
          var methodData = urlData[method];
          if (!lodash.includes(ids, methodData.operationId)) {
            // 不需要时，从ret中删除该method
            delete ret.paths[url][method];
          } else {
            isNeed = true;
          }
        });
        if (!isNeed) {
          delete ret.paths[url];
        }
      });

      delete ret.components.responses;
      delete ret.components.schemas;

      saveFile(newFileName, yaml.stringify(ret));
    }
  });
};

cherryPick(file, newFile, operationIds);
