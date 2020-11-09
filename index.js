import SwaggerParser from "@apidevtools/swagger-parser";
import lodash from "lodash";

const cherryPick = async (pathOrUrl, ids) => {
  const api = await SwaggerParser.validate(pathOrUrl);
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

  return ret;
};

export default cherryPick;
