# swagger-cherry-picker

通过输入所需方法的数组，提取 openapi 部分方法

**支持输入 文件路径 和 url**

## Quick Start

测试

```sh
node exmaple.js
```

代码使用方法

```
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
const newFile = "./new.yml";

const operationIds = ["createPark", "listRepairs", "updateMaintain"];

swaggerCherryPick(file, newFile, operationIds).then((ret) => {
  saveFile("./new.json", JSON.stringify(ret, null, 2));
  saveFile("./new.yaml", yaml.stringify(ret));
});
```
