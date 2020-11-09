import swaggerCherryPick from "./index.js";
import fs from "fs";
import yaml from "json2yaml";

const saveFile = (fileName, str) => {
  fs.writeFile(fileName, str, function (error) {
    if (error) {
      console.log("写入失败");
    } else {
      console.log("写入成功");
    }
  });
};

// const file = "./test.yml";
const file = "https://api.youyuan.36node.com/core/uat/openapi.yml";
const operationIds = ["createPark", "listRepairs", "updateMaintain"];

swaggerCherryPick(file, operationIds).then((ret) => {
  saveFile("./new.json", JSON.stringify(ret, null, 2));
  saveFile("./new.yaml", yaml.stringify(ret));
});
